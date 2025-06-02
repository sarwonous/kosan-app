// create api to get user details and update user profile
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
  avatar: string;
}

interface UserProfileResponse {
  profile: UserProfile;
}
export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/protected",
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      transformResponse: (response: UserProfileResponse) => {
        return response;
      },
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;
export default userApi;
