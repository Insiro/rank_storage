import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SessionType } from 'src/utils';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getRecordFile(@Session() session: SessionType){
    if(!(session.uid ==null || session.uid ==undefined))
      throw new UnauthorizedException()
    //TODO:create record file
    // return this.adminService.getRecordFile();
  }
}
