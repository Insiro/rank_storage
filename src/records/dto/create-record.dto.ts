import { ApiProperty } from '@nestjs/swagger';
export class CreateRecordDto {
    @ApiProperty({description:"학번"})
    student_id:string
    @ApiProperty({description:"클리어 시간"})
    clear_time:number
    @ApiProperty({description:"이름"})
    name:string
    @ApiProperty({description:"학과"})
    department:string
    @ApiProperty({description:"전화번호"})
    phone:string
    @ApiProperty({description:"로블록스 닉네임"})
    nickname:string
}
