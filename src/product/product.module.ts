import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers:
    [
      ProductService,
      PrismaService,
    ],
    exports: [ProductModule],
})
export class ProductModule { }
