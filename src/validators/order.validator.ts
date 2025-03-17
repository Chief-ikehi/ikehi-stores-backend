import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Define OrderStatus enum to match Prisma schema
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class CreateOrderDto {
  @IsOptional()
  @IsString({ each: true })
  cartItemIds?: string[];
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus = OrderStatus.PENDING;
} 