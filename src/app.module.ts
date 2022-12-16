import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'shoppingDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
    CategoryModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
