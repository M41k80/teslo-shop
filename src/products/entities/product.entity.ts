import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({
    name: 'products'
})
export class Product {

    @ApiProperty({
        example: 'b9a1c8e2-5f1d-4c3e-9a1b-2d3f4e5a6b7c',
        description: 'The product ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'The product title',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'The product price',
    })
    @Column('float', {
        default: 0,

    })
    price: number;

    @ApiProperty({
        example: 'This is a description of the product',
        description: 'The product description',
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'The product slug for SEO',
        uniqueItems: true,
    })
    @Column('text',{
        unique: true,
    })
    slug: string;


    @ApiProperty({
        example: 10,
        description: 'The products in stock',
    })
    @Column('int', {
        default: 0,
    })
    stock: number;

    @ApiProperty({
        example: ['S', 'M', 'L', 'XL'],
        description: 'The product sizes',
    })
    @Column('text',{
        array: true,
    })
    sizes: string[];


    @ApiProperty({
        example: ['men', 'women', 'unisex', 'kid'],
        description: 'The product gender',
    })
    @Column('text')
    gender:string;

    @ApiProperty({
        example: ['#tag1', '#tag2', '#tag3'],
        description: 'The product tags',
    })
    @Column('text',{
        array: true,
        default: [],
    })
    tags: string[];

    @ApiProperty({
        example: ['https://teslo-shop.s3.amazonaws.com/products/12345678-90ab-cdef-1234-567890abcdef.jpg'],
        description: 'The product images',
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true}
    )
    images? : ProductImage[];


    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
