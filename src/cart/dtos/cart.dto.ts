import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../product/dtos/product.dto';
import { UserDto } from '../../auth/dtos/user.dto';

export class CartDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty({
    type: () => ProductDto,
    isArray: true,
  })
  item: ProductDto[];

  @ApiProperty({
    type: () => UserDto,
  })
  user: UserDto;
}
