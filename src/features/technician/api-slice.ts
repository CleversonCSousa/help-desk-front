import { apiSlice } from "../../api/api-slice";

type WorkingHour = {
  id?: string;
  timeSlot: string;
};

type Technician = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  workingHours: Array<WorkingHour>;
};

type UpdateTechnicianResponse = {
  message: string;
};

type UpdateTechnicianRequest = {
  id: string;
  name: string;
  email: string;
  workingHours: Array<WorkingHour>;
};

type CreateTechnicianRequest = {
  name: string;
  email: string;
  password: string;
  workingHours: Array<WorkingHour>;
};

type CreateTechnicianResponse = {
  message: string;
  technician: {
    id: string;
    name: string;
    email: string;
    workingHours: Array<WorkingHour>;
    avatarUrl: string | null;
  };
};

export const technicianApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTechnicians: builder.query<Array<Technician>, void>({
      query: () => ({
        url: "/technicians",
        method: "GET",
      }),
    }),
    updateTechnician: builder.mutation<
      UpdateTechnicianResponse,
      UpdateTechnicianRequest
    >({
      query: (technician) => ({
        url: `/technicians`,
        method: "PUT",
        body: technician,
      }),
      async onQueryStarted({ id, ...put }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            technicianApiSlice.util.updateQueryData(
              "listTechnicians",
              undefined,
              (draft) => {
                const technician = draft.find((t) => t.id === id);

                if (technician) {
                  technician.name = put.name;
                  technician.email = put.email;
                  technician.workingHours = put.workingHours;
                }
              },
            ),
          );
        } catch (error) {
          console.error("Failed to update technician cache", error);
        }
      },
    }),
    createTechnician: builder.mutation<
      CreateTechnicianResponse,
      CreateTechnicianRequest
    >({
      query: (technician) => ({
        url: "/technicians",
        method: "POST",
        body: technician,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            technicianApiSlice.util.updateQueryData(
              "listTechnicians",
              undefined,
              (draft) => {
                draft.unshift({
                  ...data.technician,
                });
              },
            ),
          );
        } catch (error) {
          console.error("Failed to create technician", error);
        }
      },
    }),
  }),
});

export const {
  useListTechniciansQuery,
  useUpdateTechnicianMutation,
  useCreateTechnicianMutation,
} = technicianApiSlice;
