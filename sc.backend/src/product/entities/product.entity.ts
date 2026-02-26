import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rating } from '../../rating/entities/rating.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text')
  imageUrl: string;

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];
}
