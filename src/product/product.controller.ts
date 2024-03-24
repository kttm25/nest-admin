import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){

    }

    @Get()
    async all(@Query('page') page = 1){
         this.productService.paginate()
    }

    @Post()
    async create(@Body() body: ProductCreateDto){
        this.productService.create(body)
    }
}
