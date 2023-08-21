import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  

  @Get()
  getRecords(@Query('count') count: number) {
    return this.recordsService.getMany(count=count);
  }

  @Post(':studentID')
  create_or_update(@Param('studentID') studentID:string, @Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create_or_update(studentID,createRecordDto);
  }
  
  @Get(':studentID')
  async findOne(@Param('studentID') studentID: string) {
    const record = await this.recordsService.findOne(studentID);
    if( record == null)
      throw new NotFoundException();
    return record;
  }


  @Delete(':studentID')
  remove(@Param('studentID') studentID: string) {
    return this.recordsService.remove(studentID);
  }
}
