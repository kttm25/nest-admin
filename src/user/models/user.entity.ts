import { Exclude } from "class-transformer";
import { Role } from "src/role/role.entity";
import { JoinColumn, ManyToOne, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name:string;

    //Ce parametre ajouter au decorateur permet de definir que le champ est unique
    @Column({unique: true})
    email: string;
 
    @Column()
    //Permet d'empeche que ce champ soit afficher
    @Exclude()
    password: string;

    @ManyToOne(()=> Role)
    @JoinColumn({name : "role_id"})
    role: Role;
}