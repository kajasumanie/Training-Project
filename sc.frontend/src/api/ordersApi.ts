import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./interceptorsSlice";
import { Order, OrderPayload } from "../models/orders";

const getOrders = () => ({
    url: 'orders',
    method: 'GET'
});

const addOrder = (payload: OrderPayload) => ({
    url: 'orders',
    method: 'POST',
    body: payload
});

export const ordersApi = createApi({
    reducerPath: 'orders',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        getOrders: builder.query<Order[], void>({
            query: getOrders
        }),
        addOrder: builder.mutation<any, OrderPayload>({
            query: addOrder
        })
    })
});

export const { useGetOrdersQuery, useAddOrderMutation } = ordersApi;

export default ordersApi;