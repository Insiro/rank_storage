import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from 'src/entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(@InjectRepository(Record) private recordRepository: Repository<Record>){}
  private async save(record:Record){
    this.recordRepository.save(record);
  }

  async findOne(id:string):Promise<Record>{
    const record = await this.recordRepository.findOne({where:{student_id:id}});
    if (record == null) throw new NotFoundException()
    return record
  }
  

  async create_or_update(createRecordDto: CreateRecordDto) {
    const record = Record.fromCreateDto(createRecordDto)
    await this.save(record);
    return;
  }

  async getMany(offset:number=0, count:number=10):Promise<Record[]> {
    const records = await this.recordRepository.find({take:count, skip:offset, order:{clear_time:"ASC"}})
    return records;
  }


  update(id: string, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`;
  }

  async remove(id: string) {
    const record = await this.findOne(id)
    this.recordRepository.delete(record)
  }
}
