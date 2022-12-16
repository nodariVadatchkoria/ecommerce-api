import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterDto {
  @ApiPropertyOptional()
  categoryId: number;

  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  limit: number;
}
