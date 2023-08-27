import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { SessionType } from 'src/utils';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  private validatePwd(user: User, pwd: string): boolean {
    return user.cert === this.hash(pwd, user.salt);
  }

  private hash(pwd: string, salt: string): string {
    const hash = crypto.createHash('sha512');
    hash.update(pwd + salt);
    return hash.digest('hex');
  }

  private make_cert(pwd: string): { salt: string; cert: string } {
    const salt = Math.round(new Date().valueOf() * Math.random()) + '';
    const hashed_pwd = this.hash(pwd, salt);
    return { salt: salt, cert: hashed_pwd };
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user == null) throw new NotFoundException();
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const user = await this.getById(signInDto.id)
    const result = this.validatePwd(user, signInDto.pwd);
    if (result == false) throw new UnauthorizedException();
    return user
  }

  async addUser(dto: CreateUserDto): Promise<User> {
    const hashed = this.make_cert(dto.pwd)
    const new_user = { ...hashed, ...dto }
    const user = await this.userRepository.save(this.userRepository.create(new_user))

    return user;
  }
  
  updateSession(session: SessionType, user: User) {
    session.id = user.id;
    session.name = user.name;
    session.save();
  }



}
