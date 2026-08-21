import { apiSlice } from "../../api/api-slice";

type CustomerRequest = {
  name: string;
  email: string;
  password: string;
};

type CustomerResponse = {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
};

type ListCustomersResponse = Array<{
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}>;

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<CustomerResponse, CustomerRequest>({
      query: (user) => ({
        url: "/customer/register",
        method: "POST",
        body: user,
      }),
    }),
    listCustomers: builder.query<ListCustomersResponse, void>({
      query: () => ({
        url: "/customers",
        method: "GET",
      }),
    }),
  }),
});

export const { useRegisterCustomerMutation, useListCustomersQuery } =
  customerApiSlice;
