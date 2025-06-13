import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class VoucherQueryDto {
  @Type(() => Number)
  @IsOptional()
  size: number;

  @Type(() => Number)
  @IsOptional()
  page: number;

  @Type(() => String)
  @IsOptional()
  search: string;

}