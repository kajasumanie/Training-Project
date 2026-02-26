import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";

export class OrderItemDto {
    product: Product;
    quantity: number;
    totalPrice: number;
    order: Order;
    productTitle: string;
    productPrice: number;
    productImageUrl: string;
}