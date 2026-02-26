import { User } from "src/user/entities/user.entity";

interface OrderItem {
    id: number;
    quantity: number;
}

export class CreateOrderDto {
    orderItems: OrderItem[];
    user: User;
    createdAt: Date;
}
