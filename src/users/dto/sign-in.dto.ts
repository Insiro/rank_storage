import { ApiProperty } from '@nestjs/swagger';
export class SignInDto{
    @ApiProperty({description:"ID"})
    id:string;
    @ApiProperty({description:"비밀번호"})
    pwd:string;
}