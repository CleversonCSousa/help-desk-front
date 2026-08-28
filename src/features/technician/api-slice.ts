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
  }),
});

export const { useListTechniciansQuery, useUpdateTechnicianMutation } =
  technicianApiSlice;
