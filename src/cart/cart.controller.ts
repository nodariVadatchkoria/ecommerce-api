import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartEntity } from './cart.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartDto } from './dtos/cart.dto';
import { CartCreateDto } from './dtos/cart-create.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  async AddToCart(@Body() body: CartCreateDto, @Request() req): Promise<void> {
    const { productId, quantity } = body;
    return await this.cartService.addToCart(
      productId,
      quantity,
      req.user.email,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: CartDto,
    isArray: true,
  })
  @Get()
  @ApiBearerAuth()
  async getItemsInCart(@Request() req): Promise<CartEntity[]> {
    return await this.cartService.getItemsInCard(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async deleteItemFromCart(
    @Param('id') id: number,
    @Request() req,
  ): Promise<any> {
    return await this.cartService.deleteItemFromCart(id, req.user.email);
  }
}
