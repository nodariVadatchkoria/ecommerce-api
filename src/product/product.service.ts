import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteResult, ILike, In, Not, Repository, UpdateResult } from "typeorm";
import { Users } from '../auth/user.entity';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from './dtos/product-create.dto';
import { CategoryEntity } from '../category/category.entity';
import { ProductDto } from './dtos/product.dto';
import { ProductFilterDto } from './dtos/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(dto: ProductFilterDto): Promise<ProductDto[]> {
    let category = {};
    let search = {};
    let similar = {};
    console.log(dto)
    // @ts-ignore
    if (dto.categoryId && dto.categoryId != 'undefined' && dto.categoryId != 'null') {
      category = { category: { id: dto.categoryId } };

    }

    if (dto.similar) {
      similar = { id: Not(dto.similar) };
    }
    if (dto.search && dto.search != 'undefined' && dto.search != 'null') {
      search = {
        name: ILike(`%${dto.search}%`),
      };
    }

    let take = {};
    if (dto.limit) {
      take = { take: dto.limit };
    }
    return await this.productRepository.find({
      where: {
        ...category,
        ...search,
        ...similar
      },
      relations: ['category'],
      ...take,
    });
  }

  async create(dto: ProductCreateDto, user: Users): Promise<ProductDto> {
    if (user.role == 'admin') {
      const category = await this.productRepository.manager.findOne(
        CategoryEntity,
        {
          where: { id: dto.categoryId },
        },
      );
      const product = new ProductEntity();
      product.name = dto.name;
      product.description = dto.description;
      product.price = dto.price;
      product.image = dto.image;
      product.category = category;
      return await this.productRepository.save(product);
    }
    throw new UnauthorizedException();
  }

  async getOne(id: string): Promise<ProductDto> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(
    id: string,
    dto: ProductCreateDto,
    user: Users,
  ): Promise<UpdateResult> {
    console.log(user)
    if (user.role == 'admin') {
      const product = await this.productRepository.findOne({ where: { id } });

      const category = await this.productRepository.manager.findOne(
        CategoryEntity,
        {
          where: { id: dto.categoryId },
        },
      );

      product.name = dto.name;
      product.description = dto.description;
      product.price = dto.price;
      product.image = dto.image;
      product.category = category;

      return await this.productRepository.update(id, product);
    }
    throw new UnauthorizedException();
  }

  async delete(id: string, user: Users): Promise<DeleteResult> {
    if (user.role == 'admin') {
      return await this.productRepository.delete(id);
    }
    throw new UnauthorizedException();
  }
}
