import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DefaultResponse {
    status: string;
    code: number;
    message: string;
    data: UserState | unknown;
}

interface UserState {
    token?: string;
    user: {
        id: number;
        name: string;
        email: string;
        type: string;
        created_at?: string;
        updated_at?: string;
        deleted_at?: string;
        email_verified_at?: string;
    },
    expires_at?: number;
}

interface UserLogin {
    email: string;
    password: string;
};

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation<UserState, UserLogin>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
            transformResponse: (response: DefaultResponse): UserState => {
                const user = (response.data || {}) as UserState;
                return user;
            },
        }),
        me: builder.query<UserState, string>({
            query: (token) => ({
                url: "/auth/me",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
            providesTags: ["User"],
            transformResponse: (response: DefaultResponse): UserState => {
                const user = (response.data) as UserState;
                return user;
            },
        }),
        logout: builder.query({
            query: () => "/auth/logout",
        }),
    })
});

export const { useLoginMutation, useMeQuery, useLogoutQuery } = authApi;
export default authApi;
