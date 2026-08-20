import { apiSlice } from "../../api/api-slice";

type CreateServiceRequest = {
  title: string;
  description?: string;
  price: number;
};

type CreateServiceResponse = {
  service: {
    id: string;
    title: string;
    price: string;
  };
  message: string;
};

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation<
      CreateServiceResponse,
      CreateServiceRequest
    >({
      query: (service) => ({
        url: "/services",
        method: "POST",
        body: {
          ...service,
        },
      }),
    }),
  }),
});

export const { useCreateServiceMutation } = serviceApiSlice;
