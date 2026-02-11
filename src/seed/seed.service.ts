import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { Product } from '../products/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';



@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository( User )
    private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {

    await this.deleteTables();
    const adminUser =await this.insertUsers();

    await this.insertNewProducts( adminUser);
    return 'seed executed successfully';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
    .delete()
    .where({})
    .execute();
  }

  private async insertUsers(): Promise<User> {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(seedUsers);
    return dbUsers[0];

  }


  private async insertNewProducts( user: User) {
    await this.productsService.deleteAllProducts();

    // const insertPromises = [];

    const insertPromises = initialData.products.map(product => 
      this.productsService.create(product, user)
    );


    
    

    await Promise.all(insertPromises);



    return 'new products inserted successfully';
  }
}
