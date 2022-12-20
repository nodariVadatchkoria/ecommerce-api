import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductDto } from './dtos/product.dto';
import { ProductFilterDto } from './dtos/product-filter.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: ProductDto,
    isArray: true,
  })
  async GetAll(@Query() dto: ProductFilterDto): Promise<ProductDto[]> {
    return await this.productsService.getAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  @ApiBearerAuth()
  async Create(
    @Request() req,
    @Body() product: ProductCreateDto,
  ): Promise<ProductDto> {
    console.log(req)
    return await this.productsService.create(product, req.user);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  async GetOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: ProductDto,
  })
  @ApiParam({ name: 'id', required: true })
  async Update(
    @Param('id') id: string,
    @Body() product: ProductCreateDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async Delete(@Param('id') id: string, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
