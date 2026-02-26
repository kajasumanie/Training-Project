import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Order History State Management
 * Caches order data locally for better performance
 * @author Your Name
 */

export interface OrderItem {
    id: number;
    productId: number;
    productTitle: string;
    productPrice: number;
    productImageUrl: string;
    quantity: number;
    totalPrice: number;
}

export interface Order {
    id: number;
    status: string;
    userId: number;
    createdAt: string;
    orderItems: OrderItem[];
    totalAmount: number;
}

interface OrderHistoryState {
    orders: Order[];
    selectedOrder: Order | null;
    isLoading: boolean;
    lastFetched: number | null;
    cacheExpiry: number; // in milliseconds
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const initialOrderState: OrderHistoryState = {
    orders: [],
    selectedOrder: null,
    isLoading: false,
    lastFetched: null,
    cacheExpiry: CACHE_DURATION
};

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: initialOrderState,
    reducers: {
        // Set orders list
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.lastFetched = Date.now();
            state.isLoading = false;
        },
        
        // Add single order (for newly created orders)
        addOrder: (state, action: PayloadAction<Order>) => {
            const existingIndex = state.orders.findIndex(
                order => order.id === action.payload.id
            );
            
            if (existingIndex !== -1) {
                // Update existing order
                state.orders[existingIndex] = action.payload;
            } else {
                // Add new order at the beginning
                state.orders.unshift(action.payload);
            }
            state.lastFetched = Date.now();
        },
        
        // Update specific order
        updateOrder: (state, action: PayloadAction<Order>) => {
            const index = state.orders.findIndex(
                order => order.id === action.payload.id
            );
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        
        // Set selected order for details view
        selectOrder: (state, action: PayloadAction<Order | null>) => {
            state.selectedOrder = action.payload;
        },
        
        // Set loading state
        setOrdersLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        
        // Clear order cache
        clearOrderCache: (state) => {
            state.orders = [];
            state.selectedOrder = null;
            state.lastFetched = null;
        },
        
        // Check if cache is valid
        checkCacheValidity: (state) => {
            if (state.lastFetched) {
                const now = Date.now();
                const cacheAge = now - state.lastFetched;
                
                if (cacheAge > state.cacheExpiry) {
                    // Cache expired, clear it
                    state.orders = [];
                    state.lastFetched = null;
                }
            }
        },
        
        // Filter orders by status
        filterOrdersByStatus: (state, action: PayloadAction<string>) => {
            // This doesn't modify state, used for selectors
            // Actual filtering happens in component/selector
        },
        
        // Remove order from cache (e.g., after deletion)
        removeOrder: (state, action: PayloadAction<number>) => {
            state.orders = state.orders.filter(
                order => order.id !== action.payload
            );
            if (state.selectedOrder?.id === action.payload) {
                state.selectedOrder = null;
            }
        }
    }
});

// Export actions
export const {
    setOrders,
    addOrder,
    updateOrder,
    selectOrder,
    setOrdersLoading,
    clearOrderCache,
    checkCacheValidity,
    filterOrdersByStatus,
    removeOrder
} = orderHistorySlice.actions;

// Selectors
export const selectAllOrders = (state: { orderHistory: OrderHistoryState }) => 
    state.orderHistory.orders;

export const selectSelectedOrder = (state: { orderHistory: OrderHistoryState }) => 
    state.orderHistory.selectedOrder;

export const selectOrdersLoading = (state: { orderHistory: OrderHistoryState }) => 
    state.orderHistory.isLoading;

export const selectOrderById = (orderId: number) => 
    (state: { orderHistory: OrderHistoryState }) => 
        state.orderHistory.orders.find(order => order.id === orderId);

export const selectRecentOrders = (limit: number = 5) => 
    (state: { orderHistory: OrderHistoryState }) => 
        state.orderHistory.orders.slice(0, limit);

export const selectOrdersByStatus = (status: string) => 
    (state: { orderHistory: OrderHistoryState }) => 
        state.orderHistory.orders.filter(order => order.status === status);

export const selectIsCacheValid = (state: { orderHistory: OrderHistoryState }) => {
    if (!state.orderHistory.lastFetched) return false;
    const cacheAge = Date.now() - state.orderHistory.lastFetched;
    return cacheAge < state.orderHistory.cacheExpiry;
};

export default orderHistorySlice.reducer;
