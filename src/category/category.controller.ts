import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from '../product/product.service';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dtos/category-create.dto';
import { ProductDto } from '../product/dtos/product.dto';
import { CategoryDto } from './dtos/category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: CategoryDto,
    isArray: true,
  })
  async getAll(): Promise<CategoryDto[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  async getOne(@Param('id') id: number): Promise<CategoryDto> {
    return await this.categoryService.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  @ApiBearerAuth()
  async create(@Body() dto: CategoryCreateDto): Promise<CategoryDto> {
    return await this.categoryService.create(dto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() dto: CategoryCreateDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: CategoryDto,
  })
  @ApiBearerAuth()
  async delete(@Param('id') id: number): Promise<CategoryDto> {
    return await this.categoryService.delete(id);
  }
}
