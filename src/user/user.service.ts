import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResultInterface } from 'src/common/paginated-result.interface';

@Injectable()
export class UserService extends AbstractService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async paginate(page = 1): Promise<PaginatedResultInterface>{
        const {data, meta} = await super.paginate(page);
        
        return {
            data: data.map(user =>{
                const {password, ...data } = user
                return data;
            }),
            meta: meta
        }
    }
}
