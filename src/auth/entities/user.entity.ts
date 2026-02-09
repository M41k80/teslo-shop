import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
        nullable: false,
    })
    email: string;

    @Column('text',{
        nullable: false,
        select: false,
    })
    password: string;

    @Column('text',{
        nullable: false,
    })
    fullName: string;


    @Column('bool',{
        default: true,
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        default: ['user'],
        nullable: false,
    })
    roles: string[];



}
