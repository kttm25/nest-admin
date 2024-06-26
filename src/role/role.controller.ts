import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { HasPermission } from 'src/permission/has-permission.decorator';

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService){
        
    }

    @Get()
    @HasPermission('roles')
    async all(){
        return this.roleService.all();
    }

    @Get(":id")
    @HasPermission('roles')
    async get(@Param('id') id: number){
        return this.roleService.findOne({id}, ["permissions"])
    }

    @Post()
    @HasPermission('roles')
    async create(
        @Body("name") name: string,
        @Body("permissions") permissions_ids: number[]
    ): Promise<Role> {
        
        return this.roleService.create({
            name,
            permissions: permissions_ids.map((permission_id) => ({id: permission_id}) )
        });
    }

    @Put(':id')
    @HasPermission('roles')
    async update(
        @Param('id') id: number,
        @Body("name") name: string,
        @Body("permissions") permissions_ids: number[])
    {
        await  this.roleService.update(id, {
            name
        })
        const role = await this.roleService.findOne({id})
        return this.roleService.create(
            {
                ...role,
                permissions: permissions_ids.map((id) => ({id}))
            }
        )
    }

    @Delete(":id")
    @HasPermission('roles')
    async delete(@Param("id") id: number): Promise<any>{
        return this.roleService.delete(id)
    }
}
