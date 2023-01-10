import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/Product.entity';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {

    // mostra a msg de erro apenas no terminal
    // const nameExist = this.prisma.product.findFirst({
    //   where: {
    //     name: createProductDto.name
    //   }
    // })
    // if (nameExist) {
    //   throw new Error("This product name already exists.");
    // }

    const product = {
      ...createProductDto,
    }
    return await this.prisma.product.create({
      data: product
    })
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
