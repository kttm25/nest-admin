import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
    @Get()
    all(): Object{
        return ['users'];
    }
}
