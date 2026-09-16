import { apiSlice } from "../../api/api-slice";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export type TicketSummary = {
  id: string;
  code: number;
  title: string;
  serviceName: string;
  totalPrice: number;
  customerName: string;
  technicianName: string;
  status: TicketStatus;
  updatedAt: string;
};

type PaginatedResponse = {
  content: Array<TicketSummary>;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};

export type CustomerDTO = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type ServiceDTO = {
  id: string;
  title: string;
};

export type TechnicianDTO = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type AdditionalServiceDTO = {
  id: string;
  description: string;
  price: number;
};

export type TicketDetail = {
  id: string;
  code: number;
  title: string;
  description: string;
  basePrice: number;
  totalPrice: number;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  customer: CustomerDTO;
  service: ServiceDTO;
  technician: TechnicianDTO;
  additionalServices: Array<AdditionalServiceDTO>;
};

export type ListTicketsParams = {
  page?: number;
  size?: number;
  status?: TicketStatus;
};

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTickets: builder.query<PaginatedResponse, ListTicketsParams>({
      query: (params) => ({
        url: `/tickets?`,
        method: "GET",
        params: {
          page: params?.page ?? 0,
          size: params?.size,
          status: params?.status,
        },
      }),
    }),
    getTicket: builder.query<TicketDetail, string>({
      query: (id: string) => ({
        url: `/tickets/${id}`,
        method: "GET",
      }),
    }),
    updateTicketStatus: builder.mutation<
      void,
      { ticket: TicketSummary; newStatus: TicketStatus }
    >({
      query: ({ ticket, newStatus }) => ({
        url: `/tickets/${ticket.id}/status`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      async onQueryStarted(
        { ticket, newStatus },
        { dispatch, queryFulfilled },
      ) {
        try {
          await queryFulfilled;

          // remove the ticket from the set of tickets that have the old status
          dispatch(
            ticketApiSlice.util.updateQueryData(
              "listTickets",
              {
                status: ticket.status,
              },
              (draft) => {
                draft.content = draft.content.filter((t) => t.id !== ticket.id);
              },
            ),
          );

          // add the ticket to the set of tickets that have the new status
          dispatch(
            ticketApiSlice.util.updateQueryData(
              "listTickets",
              { status: newStatus },
              (draft) => {
                draft.content.unshift({ ...ticket, status: newStatus });
              },
            ),
          );

          // update the ticket on the details page
          dispatch(
            ticketApiSlice.util.updateQueryData(
              "getTicket",
              ticket.id,
              (draft) => {
                draft.status = newStatus;
              },
            ),
          );
        } catch (error) {
          console.error("Failed to update ticket cache", error);
        }
      },
    }),
  }),
});

export const {
  useListTicketsQuery,
  useGetTicketQuery,
  useUpdateTicketStatusMutation,
} = ticketApiSlice;
