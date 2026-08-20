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
    price: number;
  };
  message: string;
};

type Service = {
  id: string;
  title: string;
  description?: string;
  price: number;
  isActive: boolean;
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        let patchResult;

        try {
          const { data } = await queryFulfilled;

          patchResult = dispatch(
            serviceApiSlice.util.updateQueryData(
              "listServices",
              undefined,
              (draft) => {
                draft.push({
                  id: data.service.id,
                  title: data.service.title,
                  price: data.service.price,
                  isActive: true,
                });
              },
            ),
          );
        } catch {
          patchResult?.undo();
        }
      },
    }),
    listServices: builder.query<Service[], void>({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateServiceMutation, useListServicesQuery } =
  serviceApiSlice;
