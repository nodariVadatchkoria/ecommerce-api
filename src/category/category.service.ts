import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../product/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { CategoryDto } from './dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntityRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryDto[]> {
    return await this.categoryEntityRepository.find();
  }

  async getOne(id: number): Promise<CategoryDto> {
    return await this.categoryEntityRepository.findOne({ where: { id } });
  }

  async create(dto: CategoryCreateDto): Promise<CategoryDto> {
    const category = new CategoryEntity();
    category.name = dto.name;
    return await this.categoryEntityRepository.save(category);
  }

  async update(id: number, dto: CategoryCreateDto): Promise<CategoryDto> {
    const category = await this.categoryEntityRepository.findOne({
      where: { id },
    });
    category.name = dto.name;
    return await this.categoryEntityRepository.save(category);
  }

  async delete(id: number): Promise<CategoryDto> {
    const category = await this.categoryEntityRepository.findOne({
      where: { id },
    });
    return await this.categoryEntityRepository.remove(category);
  }
}
