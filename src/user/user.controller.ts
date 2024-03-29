import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import * as bcrypt from "bcryptjs";
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
        constructor(
            private userService: UserService,
            private authService: AuthService){

        }


    @Get()
    async all(@Query("page") page = 1): Promise<any>{
        return await this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash("1234", 12)
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password,
            role: {id: body.role_id}
        });
    }

    @Get(':id')
    async get(@Param("id") id:number){
        return this.userService.findOne({id});
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() Body: UserUpdateDto,
    ){
        const id = await this.authService.userId(request)
        
        await  this.userService.update(id, Body)
        
        return this.userService.findOne({id})
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string
    ){
        if(password != password_confirm){
            throw new BadRequestException("passwords do not match!")
        }

        const hashed = await bcrypt.hash(password, 12 ) 

        const id = await this.authService.userId(request)
        
        await  this.userService.update(id, {
            password : hashed
        })
        
        return this.userService.findOne({id})
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto)
    {
        const {role_id, ...data} = body;
        await  this.userService.update(id, 
            {
                ...data,
                role: {id: role_id}
            }
        )
        return this.userService.findOne({id})
    }
 
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<any>{
        return this.userService.delete(id)
    }
}
