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

type DeleteCustomerResponse = {
  message: string;
};

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
    deleteCustomer: builder.mutation<DeleteCustomerResponse, { id: string }>({
      query: ({ id }) => ({
        url: "/customers/" + id,
        method: "DELETE",
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            customerApiSlice.util.updateQueryData(
              "listCustomers",
              undefined,
              (draft) => {
                return draft.filter((customer) => customer.id !== id);
              },
            ),
          );
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useListCustomersQuery,
  useDeleteCustomerMutation,
} = customerApiSlice;
