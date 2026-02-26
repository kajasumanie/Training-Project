import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Notification State Management
 * Handles toast messages, alerts, and user notifications
 * @author Your Name
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration?: number;
    timestamp: number;
}

interface NotificationState {
    notifications: Notification[];
    showToast: boolean;
    activeNotification: Notification | null;
}

const initialNotificationState: NotificationState = {
    notifications: [],
    showToast: false,
    activeNotification: null
};

/**
 * Generate unique notification ID
 */
const generateNotificationId = (): string => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: initialNotificationState,
    reducers: {
        // Add a new notification
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
            const newNotification: Notification = {
                ...action.payload,
                id: generateNotificationId(),
                timestamp: Date.now(),
                duration: action.payload.duration || 3000
            };
            
            state.notifications.push(newNotification);
            state.activeNotification = newNotification;
            state.showToast = true;
        },
        
        // Show success notification
        showSuccess: (state, action: PayloadAction<string>) => {
            const notification: Notification = {
                id: generateNotificationId(),
                message: action.payload,
                type: 'success',
                duration: 3000,
                timestamp: Date.now()
            };
            state.notifications.push(notification);
            state.activeNotification = notification;
            state.showToast = true;
        },
        
        // Show error notification
        showError: (state, action: PayloadAction<string>) => {
            const notification: Notification = {
                id: generateNotificationId(),
                message: action.payload,
                type: 'error',
                duration: 5000,
                timestamp: Date.now()
            };
            state.notifications.push(notification);
            state.activeNotification = notification;
            state.showToast = true;
        },
        
        // Show warning notification
        showWarning: (state, action: PayloadAction<string>) => {
            const notification: Notification = {
                id: generateNotificationId(),
                message: action.payload,
                type: 'warning',
                duration: 4000,
                timestamp: Date.now()
            };
            state.notifications.push(notification);
            state.activeNotification = notification;
            state.showToast = true;
        },
        
        // Show info notification
        showInfo: (state, action: PayloadAction<string>) => {
            const notification: Notification = {
                id: generateNotificationId(),
                message: action.payload,
                type: 'info',
                duration: 3000,
                timestamp: Date.now()
            };
            state.notifications.push(notification);
            state.activeNotification = notification;
            state.showToast = true;
        },
        
        // Remove specific notification
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                notif => notif.id !== action.payload
            );
            if (state.activeNotification?.id === action.payload) {
                state.activeNotification = null;
                state.showToast = false;
            }
        },
        
        // Clear all notifications
        clearAllNotifications: (state) => {
            state.notifications = [];
            state.activeNotification = null;
            state.showToast = false;
        },
        
        // Hide current toast
        hideToast: (state) => {
            state.showToast = false;
        }
    }
});

// Export actions
export const {
    addNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAllNotifications,
    hideToast
} = notificationSlice.actions;

// Selectors
export const selectNotifications = (state: { notifications: NotificationState }) => 
    state.notifications.notifications;
export const selectActiveNotification = (state: { notifications: NotificationState }) => 
    state.notifications.activeNotification;
export const selectShowToast = (state: { notifications: NotificationState }) => 
    state.notifications.showToast;

export default notificationSlice.reducer;
