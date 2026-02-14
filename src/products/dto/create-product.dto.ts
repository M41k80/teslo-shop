import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength, IsIn} from "class-validator";



export class CreateProductDto {

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'The product title',
        required: true,
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        example: 10,
        description: 'The product price',
        required: true,
        nullable: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: 'This is a description of the product',
        description: 'The product description',
        required: false,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'The product slug for SEO',
        required: false,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        example: ['#tag1', '#tag2', '#tag3'],
        description: 'The product tags',
        required: false,
        nullable: true,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        example: 10,
        description: 'The products in stock',
        required: true,
        nullable: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: ['S', 'M', 'L', 'XL'],
        description: 'The product sizes',
        required: true,
        nullable: false,
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        example: ['men', 'women', 'unisex', 'kid'],
        description: 'The product gender',
        required: true,
        nullable: false,
    }
    )
    @IsIn(['men', 'women', 'unisex', 'kid'])
    gender: string;

    @ApiProperty({
        example: ['https://teslo-shop.s3.amazonaws.com/products/t_shirt_teslo.jpg'],                
        description: 'The product images',
        required: false,
        nullable: true,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]


}
