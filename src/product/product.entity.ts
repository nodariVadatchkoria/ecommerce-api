import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartEntity } from '../cart/cart.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne((type) => CategoryEntity, (category) => category.id)
  @JoinColumn()
  category: CategoryEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
