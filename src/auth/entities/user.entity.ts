import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    
    @ApiProperty({
        example: 'b9a1c8e2-5f1d-4c3e-9a1b-2d3f4e5a6b7c',
        description: 'The user ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'user@teslo.com',
        description: 'The user email',
        uniqueItems: true,
    })
    @Column('text', {
        unique: true,
        nullable: false,
    })
    email: string;

    @ApiProperty({
        example: 'SuperUser123',
        description: 'The user password',
        uniqueItems: true,
    })
    @Column('text',{
        nullable: false,
        select: false,
    })
    password: string;

    @ApiProperty({
        example: 'Super User',
        description: 'The user full name',
        
    })
    @Column('text',{
        nullable: false,
    })
    fullName: string;


    @ApiProperty({
        example: true,
        description: 'The user is active',
    })
    @Column('bool',{
        default: true,
    })
    isActive: boolean;

    @ApiProperty({
        example: ['admin', 'super-user', 'user'],
        description: 'The user roles',
    })
    @Column('text',{
        array: true,
        default: ['user'],
        nullable: false,
    })
    roles: string[];

  
    @OneToMany(
        () => Product,
        (product) => product.user,
    )
    product: Product


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
