import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async all(): Promise<User[]>{
        return this.userRepository.find();
    }

    async findOne(condition): Promise<User>{
        return this.userRepository.findOne({where: condition});
    }
    
    async create(data): Promise<User>{
        return this.userRepository.save(data);
    }
}
