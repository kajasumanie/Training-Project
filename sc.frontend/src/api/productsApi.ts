import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./interceptorsSlice";
import { Product } from "../models/products";

interface PaginatedResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
}

interface RatingPayload {
    productId: string;
    rating: number;
}

interface TopRatedParams {
    limit: number;
}

const getProducts = (params: PaginationParams) => {
    let url = `products?page=${params.page}&limit=${params.limit}`;
    if (params.search && params.search.trim() !== '') {
        url += `&search=${encodeURIComponent(params.search)}`;
    }
    return {
        url,
        method: 'GET'
    };
};

const getTopRatedProducts = (params: TopRatedParams) => ({
    url: `products/top-rated?limit=${params.limit}`,
    method: 'GET'
});

const rateProduct = (payload: RatingPayload) => ({
    url: `products/${payload.productId}/rate/${payload.rating}`,
    method: 'POST'
});

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Product'],
    endpoints: builder => ({
        getProducts: builder.query<PaginatedResponse, PaginationParams>({
            query: getProducts,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Product' as const, id })),
                        { type: 'Product', id: 'LIST' },
                    ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),
        getTopRatedProducts: builder.query<Product[], TopRatedParams>({
            query: getTopRatedProducts,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Product' as const, id })),
                        { type: 'Product', id: 'TOP_RATED' },
                    ]
                    : [{ type: 'Product', id: 'TOP_RATED' }],
        }),
        rateProduct: builder.mutation<Product, RatingPayload>({
            query: rateProduct,
            invalidatesTags: (_result, _error, { productId }) => [
                { type: 'Product', id: productId },
                { type: 'Product', id: 'LIST' },
                { type: 'Product', id: 'TOP_RATED' }
            ]
        })
    })
});

export const { 
    useGetProductsQuery, 
    useGetTopRatedProductsQuery,
    useRateProductMutation 
} = productsApi;

export default productsApi;