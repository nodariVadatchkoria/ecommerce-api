import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../product/dtos/product.dto';

export class OrderCreateDto {
  @ApiProperty({
    type: () => ProductDto,
    isArray: true,
  })
  items: ProductDto[];
}



export class ItemsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;
}
