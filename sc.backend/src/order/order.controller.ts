import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserService } from 'src/user/user.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { ProductService } from 'src/product/product.service';
import { JwtAuthGuard } from 'src/auth/utils/JwtAuthGuard';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly orderItemService: OrderItemService,
    private readonly productsService: ProductService
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    if(createOrderDto.orderItems.length === 0){
      throw new Error("Invalid order.");
    }
    const user = await this.userService.findOne(1);
    const productIds = createOrderDto.orderItems.map(oI => oI.id);
    if (!user) {
      throw new Error('User not found');
    }
    createOrderDto.user = user;
    const order = await this.orderService.create(createOrderDto);
    await Promise.all(productIds.map(async (productId) => {
      const product = await this.productsService.findOne(productId);
      if (product) {
        const qty = createOrderDto.orderItems.find(oI => oI.id === product.id)?.quantity || 0;
        await this.orderItemService.createOrderItem({
          order: { id: order.id } as Order,
          product: { id: product.id } as Product,
          quantity: +qty,
          totalPrice: (+product.price) * (+qty),
          productTitle: product.title,
          productPrice: +product.price,
          productImageUrl: product.imageUrl
        });
      }else {
        throw new Error("Invalid Product.");
      }
    }));
    return order;
  }

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();
    return orders;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
