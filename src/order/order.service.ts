import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResultInterface } from 'src/common/paginated-result.interface';

@Injectable()
export class OrderService extends AbstractService{
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ){
        super(orderRepository)
    }

    async pagine(page = 1, relations = []): Promise<PaginatedResultInterface>{
        const {data, meta} = await super.paginate(page);
        
        return {
            data: data.map(order =>{
                return {
                    id: order.id,
                    name: order.name,
                    email: order.email,
                    total: order.total,
                    price: order.price,
                    created_at: order.create_at,
                    order_items: order.order_items
                }
            }),
            meta
        }
    }
}
