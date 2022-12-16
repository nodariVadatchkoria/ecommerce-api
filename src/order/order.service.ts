import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { Users } from '../auth/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderCreateDto } from './dtos/order-create.dto';
import { OrderDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private cartService: CartService,
  ) {}

  async order(user: Users): Promise<any> {
    try {
      //find user's cart items
      const cartItems = await this.cartService.getItemsInCard(user.email);
      const subTotal = cartItems
        .map((item) => item.total)
        .reduce((acc, next) => acc + next);
      //get the authenticated user
      const authUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      const cart: any[] = cartItems.map((item) => {
        return {
          product: item.item,
          quantity: item.quantity,
          total: item.total,
        };
      });

      //create order
      const order = new OrderEntity();
      order.user = authUser;
      order.subTotal = subTotal;
      order.pending = true;
      order.items = cart;

      //save order
      const created = await this.orderRepository.save(order);
      if (created.id) {
        await this.cartService.clearCart(user.email);
      }
      return created;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOrders(user: Users): Promise<OrderDto[]> {
    return await this.orderRepository.find({
      where: {
        user: { email: user.email },
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
