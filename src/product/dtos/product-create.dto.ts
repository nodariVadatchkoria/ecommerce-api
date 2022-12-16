import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  categoryId: number;
}
