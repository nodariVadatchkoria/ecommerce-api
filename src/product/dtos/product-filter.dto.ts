import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterDto {
  @ApiPropertyOptional()
  categoryId: number;

  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  similar: string;

  @ApiPropertyOptional()
  limit: number;
}
