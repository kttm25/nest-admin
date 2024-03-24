import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService){
        
    }

    @Get()
    async all(){
        return this.roleService.all();
    }

    @Get(":id")
    async get(@Param('id') id: number){
        return this.roleService.findOne({id}, ["permissions"])
    }

    @Post()
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
    async delete(@Param("id") id: number): Promise<any>{
        return this.roleService.delete(id)
    }
}
