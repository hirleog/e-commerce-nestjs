import { Product } from '../entities/Product.entity';
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductDto extends Product{

    @IsString()
    type: string; // men, woman, kid
   
    @MinLength(4)
    @MaxLength(20)
    @IsString()
    name: string;

    @IsString()
    price: string;

    @IsString()
    size: string;
}
