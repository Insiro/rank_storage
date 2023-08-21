import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import {SignInDto} from "./dto/sign-in.dto";
import {SessionType} from "../utils";
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getSignedUser(@Session() session:SessionType):SessionType{
    return session
  }
  @Post()
  async signIn(@Body() signInDTO: SignInDto,@Session() session: SessionType) :Promise<SessionType>{
    const user = await this.usersService.signIn(signInDTO)
    this.usersService.updateSession(session, user);
    return session
  }

  @Delete()
  signOut(@Session() session: SessionType) {
    session.destroy(null);
    return "sign out";
  }
  @Post('register')
  async addUser(@Body() signUpDTO: CreateUserDto){
    const user = await this.usersService.addUser(signUpDTO)
    return "success"
  }

}
