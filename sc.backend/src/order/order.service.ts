import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>) { }

  create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async findAll() {
    return await this.ordersRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
      select: {
        id: true,
        createdAt: true,
        status: true,
        user: {
          id: true
        }
      },
      order: {
        id: 'DESC'
      }
    });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        createdAt: true,
        user: {
          id: true
        }
      }
    });
  }

}
