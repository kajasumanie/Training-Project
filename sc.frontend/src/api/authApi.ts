import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './interceptorsSlice';
import { LoginPayload, LoginResponse } from '../models/Login';

const login = (payload: LoginPayload) => ({
    url: 'login',
    method: 'POST',
    body: payload,
    credentials: 'include' as RequestCredentials
});

const register = (payload: LoginPayload) => ({
    url: 'register',
    method: 'POST',
    body: payload,
    credentials: 'include' as RequestCredentials
});

const logOut = () => ({
    url: 'logout',
    method: 'POST',
    credentials: 'include' as RequestCredentials
});

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: login
        }),
        register: builder.mutation<LoginResponse, LoginPayload>({
            query: register
        }),
        logOut: builder.mutation<void, void>({
            query: logOut
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogOutMutation } = authApi;