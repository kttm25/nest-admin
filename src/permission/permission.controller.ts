import { Controller, Get, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { HasPermission } from './has-permission.decorator';
import { PermissionGuard } from './permission.guard';

@UseGuards(PermissionGuard)
@Controller('permissions')
export class PermissionController {
    constructor(private permissionService: PermissionService){

    }

    @Get()
    async all(){
        return this.permissionService.all()
    }
}
