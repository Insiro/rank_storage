import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Record {
    @PrimaryColumn()
    student_id!:string;
    @Column()
    clear_time:number
    @Column()
    name:string
    @Column()
    department:string
    @Column()
    phone:string
    @Column()
    nickname:string
}
