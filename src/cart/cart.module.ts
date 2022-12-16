import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/user.entity';
import { ProductEntity } from '../product/product.entity';
import { CartEntity } from './cart.entity';
import { ProductService } from '../product/product.service';
import { CartController } from './cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, Users])],
  providers: [CartService, ProductService],
  controllers: [CartController],
})
export class CartModule {}
