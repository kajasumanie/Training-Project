import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./interceptorsSlice";

const getUserProfile = () => ({
    url: 'products',
    method: 'GET'
});

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        getUserProfile: builder.query({
            query: getUserProfile
        })
    })
});

export const { useGetUserProfileQuery } = userApi;

export default userApi;