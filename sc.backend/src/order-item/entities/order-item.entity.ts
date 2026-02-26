import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orderItems')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal')
  totalPrice: number;

  // Capture product details at the time of order
  @Column()
  productTitle: string;

  @Column('decimal')
  productPrice: number;

  @Column({ nullable: true })
  productImageUrl: string;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
}