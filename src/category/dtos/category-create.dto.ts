import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
  @ApiProperty()
  name: string;
}
