import { Controller, Get, Post, Body,  Delete, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import {SignInDto} from "./dto/sign-in.dto";
import {SessionType, SessionInfo} from "../utils";
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags("로그인 API")
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOperation({ summary: '로그인 확인'})
  @ApiResponse({description:"로그인된 유저정보", type:SessionInfo})
  getSignedUser(@Session() session:SessionType):SessionType{
    return session
  }

  @Post()
  @ApiOperation({ summary: '로그인'})
  @ApiResponse({description:"로그인된 유저정보", type:SessionInfo})
  async signIn(@Body() signInDTO: SignInDto,@Session() session: SessionType) :Promise<SessionType>{
    const user = await this.usersService.signIn(signInDTO)
    this.usersService.updateSession(session, user);
    return session
  }

  @Delete()
  @ApiOperation({ summary: '로그아웃'})
  signOut(@Session() session: SessionType) {
    session.destroy(null);
    return "sign out";
  }
  
  @Post('register')
  @ApiOperation({ summary: '회원가입'})
  async addUser(@Body() signUpDTO: CreateUserDto){
    await this.usersService.addUser(signUpDTO)
    return "success"
  }

}
