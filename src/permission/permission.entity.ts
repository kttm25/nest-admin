import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("permissons")
export class Permission{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}