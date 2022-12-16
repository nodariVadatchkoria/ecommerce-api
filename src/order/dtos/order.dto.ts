import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../auth/dtos/user.dto';

export class OrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  items: object;

  @ApiProperty({
    type: () => UserDto,
  })
  user: UserDto;

  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  pending: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
