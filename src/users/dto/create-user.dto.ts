import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({description:"ID"})
    id:string;
    @ApiProperty({description:"비밀번호"})
    pwd:string;
    @ApiProperty({description:"이름"})
    name:string;
}
