import { Controller, Get, Post, Body, Param, Delete, Query, NotFoundException,ConflictException } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordRankDTO } from "./dto/record_rank.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('records')
@ApiTags("기록 API")
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }



  @Get()
  @ApiOperation({ summary: '기록들을 가져온다', description: '대쉬보드에 보여주기위한 기록들을 가져온다' })
  @ApiResponse({ description: "레코드 정보", type: Array<RecordRankDTO> })
  async getRecords(@Query('count') count: number=10): Promise<RecordRankDTO[]> {
    let records = await this.recordsService.getMany(count = count);
    return records.map(it => new RecordRankDTO(it))
  }

  @Post()
  @ApiOperation({ summary: '레코드 저장', description: '기록이 있으면 업데이트, 없으면 생성한다' })
  async create(@Body() createRecordDto: CreateRecordDto) {
    let ret = await this.recordsService.create(createRecordDto);
    if (!ret)throw new ConflictException()
  }

  @Get(':studentID')
  @ApiOperation({ summary: '레코드 조회', description: '단일 학생의 레코드를 학번을 기준으로 검색한다' })
  async findOne(@Param('studentID') studentID: string) {
    const record = await this.recordsService.findOne(studentID);
    if (record == null)
      throw new NotFoundException();
    return record;
  }

  @Delete('clear')
  clear(){
    console.log('aaaaa')
    return this.recordsService.clear()
  }
  @Delete(':studentID')
  @ApiOperation({ summary: '레코드 삭제', description: '단일 학생의 레코드를 학번을 기준으로 삭제한다' })
  remove(@Param('studentID') studentID: string) {
    return this.recordsService.remove(studentID);
  }

}
