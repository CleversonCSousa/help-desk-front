import { apiSlice } from "../../api/api-slice";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),
    getMe: builder.query({
      query: () => "/me",
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApiSlice;
