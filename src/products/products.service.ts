import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import e from 'express';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

   async create(createProductDto: CreateProductDto) {

    try{
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {

      this.handleDBExceptions(error);
    }
    
  }

  findAll() {
    return this.productRepository.find({});
  }

  async findOne(id: string) {

    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
  const product = await this.findOne(id);


  if (!product) {
    throw new BadRequestException(`Product #${id} not found`);
  }

  await this.productRepository.remove(product);
  return `product with id ${id} removed successfully`;
}




  private handleDBExceptions(error: unknown) {
  if (this.isPostgresError(error) && error.code === '23505') {
    throw new BadRequestException(error.detail);
  }

  this.logger.error(error);
  throw new InternalServerErrorException(
    'Unexpected error, check the logs',
  );
}

private isPostgresError(
  error: unknown,
): error is { code: string; detail?: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as any).code === 'string'
  );
}

}
