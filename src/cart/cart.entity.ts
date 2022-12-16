import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { Users } from '../auth/user.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => ProductEntity, (order) => order.id)
  @JoinColumn()
  item: ProductEntity;

  @ManyToOne((type) => Users, (user) => user.email)
  @JoinColumn()
  user: Users;
}
