import { ApiProperty } from '@nestjs/swagger';

export class CartCreateDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;
}
