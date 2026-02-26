import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { RatingModule } from 'src/rating/rating.module';
import { UserModule } from 'src/user/user.module';
import { OrderItemModule } from 'src/order-item/order-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), RatingModule, UserModule, OrderItemModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
