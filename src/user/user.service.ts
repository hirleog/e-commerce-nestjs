import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // const res = this.prisma.user.create({
    //   user: createUserDto  
    // });

    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }
    return user;

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  // findAll() {
    // return `This action returns all user`;
  // }


  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
