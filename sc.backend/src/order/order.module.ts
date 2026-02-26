import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderItemModule, UserModule, ProductModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
