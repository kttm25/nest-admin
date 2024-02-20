import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
