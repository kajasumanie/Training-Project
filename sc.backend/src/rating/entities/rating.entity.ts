import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.ratings)
  product: Product;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;
}
