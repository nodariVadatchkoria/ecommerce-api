import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../auth/user.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'simple-json',
  })
  public items!: any;

  @ManyToOne((type) => Users, (user) => user.id)
  @JoinColumn()
  user: Users;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
