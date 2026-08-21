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

type ToggleIsActiveResponse = {
  message: string;
};

type UpdateServiceRequest = {
  id: string;
  title: string;
  description?: string;
  price: number;
};

type UpdateServiceResponse = {
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        let patchResult;

        try {
          const { data } = await queryFulfilled;

          patchResult = dispatch(
            serviceApiSlice.util.updateQueryData(
              "listServices",
              undefined,
              (draft) => {
                draft.unshift({
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
    toggleIsActive: builder.mutation<ToggleIsActiveResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/services/${id}/active`,
        method: "PATCH",
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        let patchResult;

        try {
          await queryFulfilled;
          patchResult = dispatch(
            serviceApiSlice.util.updateQueryData(
              "listServices",
              undefined,
              (draft) => {
                // searches for a service with the same ID passed as a parameter
                const service = draft.find((s) => s.id === id);
                if (service) {
                  // toggle isActive
                  service.isActive = !service.isActive;
                }
              },
            ),
          );
        } catch {
          patchResult?.undo();
        }
      },
    }),
    updateService: builder.mutation<
      UpdateServiceResponse,
      UpdateServiceRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ id, ...put }, { dispatch, queryFulfilled }) {
        let putResult;

        try {
          await queryFulfilled;
          putResult = dispatch(
            serviceApiSlice.util.updateQueryData(
              "listServices",
              undefined,
              (draft) => {
                const service = draft.find((s) => s.id === id);
                if (service) {
                  service.title = put.title;
                  // protects the flow, only updates the description if it was provided
                  if (put.description !== undefined) {
                    service.description = put.description;
                  }

                  service.price = put.price;
                }
              },
            ),
          );
        } catch {
          putResult?.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useListServicesQuery,
  useToggleIsActiveMutation,
  useUpdateServiceMutation,
} = serviceApiSlice;
