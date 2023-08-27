import { CreateRecordDto } from "src/records/dto/create-record.dto";
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
    static fromCreateDto(dto:CreateRecordDto){
        let record = new Record()
        record.student_id = dto.student_id
        record.clear_time = dto.clear_time
        record.name = dto.name
        record.department = dto.department
        record.phone=dto.phone
        record.nickname=dto.nickname
        return record
    }
}
