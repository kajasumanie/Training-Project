import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/products";

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

const calculateTotalItems = (items: ShoppingCartItem[]): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
};

const initialCartState: ShoppingCartState = {
    items: [],
    drawerOpen: false,
    totalItems: 0
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
        },
        
        // Remove product from cart completely
        removeProductFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
            state.totalItems = calculateTotalItems(state.items);
        },
        
        // Update specific product quantity
        modifyItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const targetItem = state.items.find(
                (item) => item.product.id === action.payload.productId
            );
            if (targetItem) {
                targetItem.quantity = Math.max(1, action.payload.quantity);
                state.totalItems = calculateTotalItems(state.items);
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
            }
        },
        
        // Empty the entire cart
        emptyCart: (state) => {
            state.items = [];
            state.totalItems = 0;
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
