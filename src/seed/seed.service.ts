import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { Product } from '../products/entities';



@Injectable()
export class SeedService {
  constructor(private productsService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'seed executed successfully';
  }

  private async insertNewProducts() {
    this.productsService.deleteAllProducts();


    const insertPromises = initialData.products.map(product => 
      this.productsService.create(product)
    );


    

    await Promise.all(insertPromises);



    return 'new products inserted successfully';
  }
}
