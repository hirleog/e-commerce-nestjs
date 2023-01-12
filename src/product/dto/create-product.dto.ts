import { Product } from '../entities/Product.entity';
import { IsInt, isInt, IsNumberString, IsString, maxLength, MaxLength, MinLength } from "class-validator";

export class CreateProductDto extends Product {

    @IsString()
    type: string; // men, woman, kid

    // @MinLength(4)
    // @MaxLength(20)
    @IsString()
    name: string;

    @IsNumberString()
    price: string;

    // @MinLength(1)
    // @MaxLength(2)
    @IsString()
    size: string;
}
