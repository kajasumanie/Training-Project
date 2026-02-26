import { Product } from "./products";

export interface OrderItemPayload {
    id: number;
    quantity: number;
}

interface OrderItem {
    id: number;
    quantity: number;
    totalPrice: string;
    productTitle: string;
    productPrice: number;
    productImageUrl: string;
    product?: Product; // Optional product relation from backend
}

interface User {
    id: number;
}

export interface Order {
    id: number;
    createdAt: string;
    user: User;
    orderItems: OrderItem[];
    status: string;
}

export type OrderPayload = {
    orderItems: OrderItemPayload[];
}