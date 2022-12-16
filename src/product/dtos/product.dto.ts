import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from '../../category/dtos/category.dto';

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: () => CategoryDto })
  category: CategoryDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
