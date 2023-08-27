import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    uid!:number;
    @Column({unique:true})
    id!:string;
    @Column()
    name!:string;
    @Column()
    cert!:string;
    @Column()
    salt!:string;
    
}
