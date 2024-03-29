import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstractService {
    constructor(@InjectRepository(Product) productRepository: Repository<Product>){
        super(productRepository);
    }
}
