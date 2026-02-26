import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { default: 'Pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
