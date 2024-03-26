import { ClassSerializerInterceptor, Controller, Get, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';
import { Parser } from 'json2csv';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService){

    }

    @Get('orders')
    async all(@Query('page') page = 1){
        //return this.orderService.all(['order_items'])
        return this.orderService.paginate(page, ['order_items'])
    }

    @Post("export")
    async export(@Res() res: Response) {
        const parser = new Parser({
            fields:["ID", "Name", "Email", "Product Titel", "Price", "Qunatity"]
        });

        const orders = await this.orderService.all(['order_items']);

        const json = [];

        orders.forEach((o) =>{
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title': '',
                Price: '',
                Quantity: ''
            })
            o.order_items.forEach((i) => {
                json.push({
                    ID: '',
                    Name: "",
                    Email: '',
                    'Product Title': i.product_title,
                    Price: i.price,
                    Quantity: i.quantity
                })
            })

            const csv = parser.parse(json)
            res.header('content-type', 'csv');
            res.attachment('orders.csv');
            res.send(csv)
        })
    }
}
