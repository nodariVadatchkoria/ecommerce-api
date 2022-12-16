import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '../cart/cart.entity';
import { ProductEntity } from '../product/product.entity';
import { Users } from '../auth/user.entity';
import { OrderEntity } from './order.entity';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ProductEntity, CartEntity, Users]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
})
export class OrderModule {}
