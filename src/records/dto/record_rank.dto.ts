import {Record} from "../../entities/record.entity"
export class RecordRankDTO{
    clear_time:number
    nickname:string
    constructor(record:Record){
        this.clear_time = record.clear_time
        this.nickname = record.nickname
    }
}