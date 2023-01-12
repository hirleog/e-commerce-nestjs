import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IsPublic } from './../auth/decorators/is-public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/api-v1')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @IsPublic()
  @Post('/create-product')
  create(@Body() createUserDto: CreateProductDto) {
    return this.productService.create(createUserDto);
  }

  @IsPublic()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false)
      }
      cb(null, true);
    }
  }))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file, 'lalalal');
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
