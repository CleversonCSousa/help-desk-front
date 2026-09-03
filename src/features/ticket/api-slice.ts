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

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTickets: builder.query<PaginatedResponse, number>({
      query: (page: number = 0) => ({
        url: `/tickets?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useListTicketsQuery } = ticketApiSlice;
