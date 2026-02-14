
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({
    name: 'products_images'
})
export class ProductImage {

    @ApiProperty({
        example: 'b9a1c8e2-5f1d-4c3e-9a1b-2d3f4e5a6b7c',
        description: 'The product image ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'https://teslo-shop.s3.amazonaws.com/products/12345678-90ab-cdef-1234-567890abcdef.jpg',
        description: 'The product image URL',
        uniqueItems: true,
    })
    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        (product) => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Product;
}