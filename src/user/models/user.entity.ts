import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}