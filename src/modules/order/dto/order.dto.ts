import {
  IsBoolean,
  IsInt,
  Min,
  ValidateNested,
  IsArray,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class OrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  order: OrderItemDto[];

  @IsBoolean()
  @IsOptional()
  isMember?: boolean;
}
