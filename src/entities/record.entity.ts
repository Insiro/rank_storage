import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Record {
    @PrimaryColumn()
    student_id!:string;
}
