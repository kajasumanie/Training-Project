import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store/store';

/**
 * Application Global State Management
 * Manages theme, UI preferences, and app-wide settings
 * @author Kaja
 */

export type ThemeVariant = 'light' | 'dark';

export interface ApplicationState {
  currentTheme: ThemeVariant;
  sidebarCollapsed: boolean;
}

const initialAppState: ApplicationState = {
  currentTheme: 'light',
  sidebarCollapsed: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState: initialAppState,
  reducers: {
    // Toggle between light and dark themes
    switchTheme: (state, action: PayloadAction<ThemeVariant>) => {
      state.currentTheme = action.payload === 'light' ? 'dark' : 'light';
    },
    // Set specific theme
    setThemeVariant: (state, action: PayloadAction<ThemeVariant>) => {
      state.currentTheme = action.payload;
    },
    // Toggle sidebar state
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { switchTheme, setThemeVariant, toggleSidebar } = applicationSlice.actions;

// Selectors
export const selectCurrentTheme = (state: RootState) => state.application.currentTheme;
export const selectSidebarState = (state: RootState) => state.application.sidebarCollapsed;

export default applicationSlice.reducer;
