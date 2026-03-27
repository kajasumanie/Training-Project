import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setLoginRedirect } from '../store/slices/authSlice';
import { LoginResponse } from '../models/Login';

/**
 * API Interceptor Configuration
 * Handles authentication, token refresh, and error responses
 * @author Kaja
 */

// Base API configuration
const apiBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/',
    credentials: 'include',
    prepareHeaders(headers) {
        headers.set('Content-Type', 'application/json');
        headers.set('X-Requested-With', 'XMLHttpRequest');
        return headers;
    }
});

/**
 * Enhanced query handler with automatic token refresh
 * Intercepts 401 errors and attempts to refresh authentication
 */
export const apiQueryWithAuthRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Execute initial request
    let response = await apiBaseQuery(args, api, extraOptions);
    
    // Log API interactions for debugging
    if (process.env.NODE_ENV === 'development') {
        console.debug('[API]', args, response);
    }
    
    // Handle unauthorized errors (401)
    if (response.error && response.error.status === 401) {
        console.info('[Auth] Access token expired, refreshing...');
        
        // Attempt to refresh the access token
        const refreshResponse = await apiBaseQuery({
            url: '/refreshToken',
            method: 'POST',
            credentials: 'include'
        }, api, extraOptions);
        
        if (refreshResponse.data) {
            // Token refresh successful
            const authData = refreshResponse.data as LoginResponse;
            sessionStorage.setItem('access_token', JSON.stringify(authData.accessToken));
            console.info('[Auth] Token refreshed successfully');
            
            // Retry the original request
            response = await apiBaseQuery(args, api, extraOptions);
        } else {
            // Token refresh failed, redirect to login
            console.warn('[Auth] Token refresh failed, redirecting to login');
            api.dispatch(setLoginRedirect(true));
        }
    }
    
    return response;
};

// Re-export for backward compatibility
export const baseQueryWithReauth = apiQueryWithAuthRefresh;
