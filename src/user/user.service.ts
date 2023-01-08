import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    
    // mostra a msg de erro apenas no terminal
    const emailExist = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      }
    })
    if (emailExist) {
      throw new Error("User e-mail already exists!");
    }

    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }
    return this.prisma.user.create({
      data: user
      
    })
  }

  async findOne(id: number) {

    return await this.prisma.user.findUnique({
      where: {
        id,
      }
    })
  }

  async findAll() {
    return await this.prisma.user.findMany()
    // return res;
  }


  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
