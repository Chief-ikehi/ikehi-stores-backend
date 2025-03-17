import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  productId: string = '';

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number = 1;
}

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsString()
  cartItemId: string = '';

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number = 1;
}

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsString()
  cartItemId: string = '';
} 