import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from 'src/entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(@InjectRepository(Record) private recordRepository: Repository<Record>) { }
  private async save(record: Record) {
    this.recordRepository.save(record);
  }

  async findOne(id: string): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { student_id: id } });
    if (record == null) throw new NotFoundException()
    return record
  }


  async create_or_update(createRecordDto: CreateRecordDto) {
    const record = Record.fromCreateDto(createRecordDto)
    await this.save(record);
    return;
  }

  async getMany(count: number = 10): Promise<Record[]> {
    return await this.recordRepository
      .createQueryBuilder()
      .orderBy('clear_time', "ASC")
      .limit(count)
      .getMany()
  }


  async remove(id: string) {
    const record = await this.findOne(id)
    this.recordRepository.delete(record)
  }
}
