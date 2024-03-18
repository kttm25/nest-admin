import { Permission } from "src/permission/permission.entity";
import { JoinTable } from "typeorm";
import { ManyToMany } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @ManyToMany(() => Permission, {cascade: true})
    @JoinTable({
        name: 'role_permission',
        joinColumn: { name: "role_id", referencedColumnName: "id"},
        inverseJoinColumn: { name : "permission_id", referencedColumnName: "id"}
    })
    permissions: Permission[];
}