import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { OrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrderItemService {

    constructor(@InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>) { }

    createOrderItem(orderItemDto: OrderItemDto) {
        const orderItem = this.orderItemsRepository.create(orderItemDto);
        console.log(orderItem);
        return this.orderItemsRepository.save(orderItem);
    }

    async findByProductId(productId: number): Promise<OrderItem[]> {
        return this.orderItemsRepository.find({
            where: { product: { id: productId } },
            relations: ['product']
        });
    }
}
