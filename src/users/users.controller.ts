import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {SignInDto} from "./dto/sign-in.dto";
import {SessionType} from "../utils";
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signIn(@Body() signInDTO: SignInDto,@Session() session: SessionType) :Promise<SessionType>{
    const user = await this.usersService.signIn(signInDTO)
    session.id = user.id;
    session.name = user.name;
    session.save();

    return session
  }

  @Delete()
  withdrawal(@Session() session: SessionType) {
    session.destroy(null);
    //TODO:delete user
    return "sign out";
  }
}
