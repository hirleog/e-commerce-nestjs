import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IsPublic } from './../auth/decorators/is-public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @IsPublic()
  @Post('create-product')
  @UseInterceptors(FilesInterceptor('image'))
  create(@Body() createUserDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    
    return this.productService.create(createUserDto);
  }

  @IsPublic()
  @Get('products')
  findAll() {
    return this.productService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @IsPublic()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
  
  @IsPublic()
  @Delete('delete-all')
  removeAll() {
    return this.productService.removeAll();
  }
}
