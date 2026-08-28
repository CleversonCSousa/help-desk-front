import { apiSlice } from "../../api/api-slice";

type WorkingHour = {
  id: string;
  timeSlot: string;
};

type Technician = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
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
  }),
});

export const { useListTechniciansQuery } = technicianApiSlice;
