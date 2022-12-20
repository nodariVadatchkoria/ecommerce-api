import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { Users } from '../auth/user.entity';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/product.entity';
import { CartDto } from './dtos/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private productsService: ProductService,
  ) {}

  async addToCart(
    productId: string,
    quantity: number,
    user: string,
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      where: {
        user: {
          email: user,
        },
      },
      relations: ['item', 'user'],
    });
    const product = await this.productsService.getOne(productId);
    const authUser = await this.userRepository.findOne({
      where: { email: user },
    });

    //Confirm the product exists.
    if (product) {
      //confirm if user has item in cart
      const cart = cartItems.filter((item) => item.item.id === productId);
      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.item = product as ProductEntity;
        await this.cartRepository.save(newItem);

        return await this.cartRepository.save(newItem);
      } else {
        //Update the item quantity
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].item.price * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }

  async getItemsInCard(user: string): Promise<CartEntity[]> {
    return await this.cartRepository.find({
      where: {
        user: {
          email: user,
        },
      },
      relations: ['item', 'user'],
    });
  }

  async clearCart(email: string) {
    const cartItems = await this.cartRepository.find({
      where: {
        user: {
          email,
        },
      },
    });
    if (cartItems.length > 0) {
      await this.cartRepository.remove(cartItems);
    }
  }

  async deleteItemFromCart(id: number, email) {
    const cartItems = await this.cartRepository.find({
      where: {
        user: {
          email,
        },
      },
    });
    const item = cartItems.filter((item) => item.id === id);
    if (item.length > 0) {
      return await this.cartRepository.remove(item);
    }

    return null;
  }
}
