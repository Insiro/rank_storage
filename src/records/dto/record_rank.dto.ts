import {Record} from "../../entities/record.entity";
import { ApiProperty } from '@nestjs/swagger';
export class RecordRankDTO{
    @ApiProperty({description:"클리어 시간"})
    clear_time:number
    @ApiProperty({description:"닉네임"})
    nickname:string
    constructor(record:Record){
        this.clear_time = record.clear_time;
        this.nickname = record.nickname
    }
}