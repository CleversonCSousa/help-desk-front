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

export const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTickets: builder.query<PaginatedResponse, number>({
      query: (page: number = 0) => ({
        url: `/tickets?page=${page}`,
        method: "GET",
      }),
    }),
    getTicket: builder.query<TicketDetail, string>({
      query: (id: string) => ({
        url: `/tickets/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useListTicketsQuery, useGetTicketQuery } = ticketApiSlice;
