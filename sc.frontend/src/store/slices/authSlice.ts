import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Authentication State Management
 * Handles user authentication status and session management
 * @author Your Name
 */

interface AuthenticationState {
    requiresLogin: boolean;
    userAuthenticated: boolean;
    sessionActive: boolean;
}

const initialAuthState: AuthenticationState = {
    requiresLogin: false,
    userAuthenticated: false,
    sessionActive: false
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialAuthState,
    reducers: {
        // Trigger login redirect when session expires
        setLoginRedirect: (state, action: PayloadAction<boolean>) => {
            state.requiresLogin = action.payload;
        },
        // Update user authentication status
        updateAuthStatus: (state, action: PayloadAction<boolean>) => {
            state.userAuthenticated = action.payload;
            state.sessionActive = action.payload;
        },
        // Clear authentication state on logout
        clearAuthState: (state) => {
            state.requiresLogin = false;
            state.userAuthenticated = false;
            state.sessionActive = false;
        }
    }
});

export const { setLoginRedirect, updateAuthStatus, clearAuthState } = userAuthSlice.actions;
export default userAuthSlice.reducer;
