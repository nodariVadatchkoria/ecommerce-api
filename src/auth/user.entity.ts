import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CartEntity } from '../cart/cart.entity';
import { OrderEntity } from '../order/order.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => CartEntity, (cart) => cart.id)
  @JoinColumn()
  cart: CartEntity[];

  @OneToOne((type) => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;
}
