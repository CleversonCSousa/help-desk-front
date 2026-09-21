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
  description: string;
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

type CreateTicketRequest = {
  title: string;
  description: string;
  serviceId: string;
};

type CreateTicketResponse = {
  message: string;
  ticket: TicketDetail;
};

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation<CreateTicketResponse, CreateTicketRequest>({
      query: (ticket) => ({
        url: "/tickets",
        method: "POST",
        body: {
          ...ticket,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            ticketApiSlice.util.updateQueryData(
              "listTickets",
              {
                status: "OPEN",
              },
              (draft) => {
                draft.content.unshift({
                  id: data.ticket.id,
                  code: data.ticket.code,
                  title: data.ticket.title,
                  serviceName: data.ticket.service.title,
                  totalPrice: data.ticket.totalPrice,
                  customerName: data.ticket.customer.name,
                  technicianName: data.ticket.technician.name,
                  status: data.ticket.status,
                  updatedAt: data.ticket.updatedAt,
                });
              },
            ),
          );
        } catch (error) {
          console.error("Failed to create ticket", error);
        }
      },
    }),
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
    createAdditionalService: builder.mutation<
      AdditionalServiceDTO,
      { ticketId: string; description: string; price: number }
    >({
      query: ({ ticketId, description, price }) => ({
        url: `/tickets/${ticketId}/additional-services`,
        method: "POST",
        body: {
          description,
          price,
        },
      }),
      async onQueryStarted({ ticketId }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { id, price, description },
          } = await queryFulfilled;

          dispatch(
            ticketApiSlice.util.updateQueryData(
              "getTicket",
              ticketId,
              (draft) => {
                draft.additionalServices.push({
                  id,
                  price,
                  description,
                });
                draft.totalPrice += price;
              },
            ),
          );
        } catch (error) {
          console.error("Failed to update ticket cache", error);
        }
      },
    }),
    deleteAdditionalService: builder.mutation<
      void,
      { ticketId: string; additionalServiceId: string }
    >({
      query: ({ ticketId, additionalServiceId }) => ({
        url: `/tickets/${ticketId}/additional-services/${additionalServiceId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { ticketId, additionalServiceId },
        { dispatch, queryFulfilled },
      ) {
        try {
          await queryFulfilled;

          dispatch(
            ticketApiSlice.util.updateQueryData(
              "getTicket",
              ticketId,
              (draft) => {
                const additionalService = draft.additionalServices.find(
                  (service) => service.id === additionalServiceId,
                );

                draft.totalPrice -= additionalService.price;
                draft.additionalServices = draft.additionalServices.filter(
                  (service) => service.id !== additionalServiceId,
                );
              },
            ),
          );
        } catch (error) {
          console.error("Failed to delete additional service cache", error);
        }
      },
    }),
  }),
});

export const {
  useListTicketsQuery,
  useGetTicketQuery,
  useUpdateTicketStatusMutation,
  useCreateAdditionalServiceMutation,
  useDeleteAdditionalServiceMutation,
  useCreateTicketMutation,
} = ticketApiSlice;
