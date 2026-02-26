import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/products";

/**
 * Shopping Cart State Management
 * Manages cart items, quantities, and persistence
 * @author Your Name
 */

// Cart item interface with product and quantity
interface ShoppingCartItem {
    product: Product;
    quantity: number;
}

// Main cart state structure
interface ShoppingCartState {
    items: ShoppingCartItem[];
    drawerOpen: boolean;
    totalItems: number;
}

// Constants for localStorage management
const CART_STORAGE_KEY = 'user-cart-data';

/**
 * Load saved cart data from browser storage
 * @returns Array of cart items or empty array
 */
const loadSavedCart = (): ShoppingCartItem[] => {
    try {
        const storedData = localStorage.getItem(CART_STORAGE_KEY);
        if (storedData) {
            return JSON.parse(storedData);
        }
    } catch (err) {
        console.warn('Failed to load cart data:', err);
    }
    return [];
};

/**
 * Persist cart data to browser storage
 * @param items - Current cart items
 */
const persistCartData = (items: ShoppingCartItem[]): void => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
        console.warn('Failed to save cart data:', err);
    }
};

/**
 * Calculate total number of items in cart
 * @param items - Cart items array
 * @returns Total quantity across all items
 */
const calculateTotalItems = (items: ShoppingCartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
};

// Initialize cart state with saved data
const initialCartState: ShoppingCartState = {
    items: loadSavedCart(),
    drawerOpen: false,
    totalItems: calculateTotalItems(loadSavedCart())
};

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: initialCartState,
    reducers: {
        // Add product to cart or increment if exists
        addProductToCart: (state, action: PayloadAction<Product>) => {
            const existingProduct = state.items.find(
                (item) => item.product.id === action.payload.id
            );

            if (existingProduct) {
                // Increment quantity for existing product
                existingProduct.quantity += 1;
            } else {
                // Add new product to cart
                state.items.push({
                    product: action.payload,
                    quantity: 1
                });
            }
            state.totalItems = calculateTotalItems(state.items);
            persistCartData(state.items);
        },
        
        // Remove product from cart completely
        removeProductFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
            state.totalItems = calculateTotalItems(state.items);
            persistCartData(state.items);
        },
        
        // Update specific product quantity
        modifyItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const targetItem = state.items.find(
                (item) => item.product.id === action.payload.productId
            );
            if (targetItem) {
                targetItem.quantity = Math.max(1, action.payload.quantity);
                state.totalItems = calculateTotalItems(state.items);
                persistCartData(state.items);
            }
        },
        
        // Increase quantity by one
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const targetItem = state.items.find(
                (item) => item.product.id === action.payload
            );
            if (targetItem) {
                targetItem.quantity += 1;
                state.totalItems = calculateTotalItems(state.items);
                persistCartData(state.items);
            }
        },
        
        // Decrease quantity by one (minimum 1)
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const targetItem = state.items.find(
                (item) => item.product.id === action.payload
            );
            if (targetItem && targetItem.quantity > 1) {
                targetItem.quantity -= 1;
                state.totalItems = calculateTotalItems(state.items);
                persistCartData(state.items);
            }
        },
        
        // Empty the entire cart
        emptyCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            persistCartData(state.items);
        },
        
        // Toggle cart drawer visibility
        toggleCartDrawer: (state, action: PayloadAction<boolean>) => {
            state.drawerOpen = action.payload;
        }
    }
});

// Export all cart actions
export const {
    addProductToCart,
    removeProductFromCart,
    modifyItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
    toggleCartDrawer
} = shoppingCartSlice.actions;

// Selector functions for accessing cart state
export const selectCartItems = (state: { shoppingCart: ShoppingCartState }) => state.shoppingCart.items;
export const selectCartTotal = (state: { shoppingCart: ShoppingCartState }) => state.shoppingCart.totalItems;
export const selectCartDrawerState = (state: { shoppingCart: ShoppingCartState }) => state.shoppingCart.drawerOpen;

export default shoppingCartSlice.reducer;