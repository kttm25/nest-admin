import { BadRequestException, Body, Controller, Post, Get, NotFoundException, Res, Req, UseInterceptors, ClassSerializerInterceptor, Delete, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { PassThrough } from 'stream';

//Est couplé avec le decorateur @Exclude du model afin d'empecher l'affichage de champ non desiré
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){

    }

    @Post('register')
    async register(@Body() body: RegisterDTO){
        if(body.password != body.password_confirm){
            throw new BadRequestException('Passwords do not match!')
        }
        const {role_id, ...data} = body;
        const hashed = await bcrypt.hash(body.password, 12);
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed,
            role: {
                id: role_id
            }
        });
    }

    @Post('login')
    async login(
        @Body('email') email : string,
        @Body('password') password : string,
        @Res({passthrough: true}) response: Response
    ){
        const user = await this.userService.findOne({email});
        if(!user){
            throw new NotFoundException('User not found')
        }
        else if(!await bcrypt.compare(password, user.password) ){
            throw new BadRequestException("Invalid credentials")
        }
        else{
            const jwt = await this.jwtService.signAsync({id: user.id})
            response.cookie("jwt", jwt, {httpOnly: true})
            return user;
        }
    }
    
    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request){
        const cookie = request.cookies["jwt"];
        const data = await this.jwtService.verifyAsync(cookie)
        return this.userService.findOne({id : data.id});
    }

    @UseGuards(AuthGuard)
    @Delete('logout')
    async logout(@Res({passthrough: true}) response: Response){
        response.clearCookie('jwt');
        return {
            message: 'success'
        }
    }

}
