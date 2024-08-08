import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Inventory } from '../../inventory/entity/inventory.entity';
import { Customer } from '../../customer/entity/customer.entity';

@Entity({ name: 'rental' })
export class Rental {
  @PrimaryGeneratedColumn()
  rental_id: number;

  @Column({
    type: 'timestamptz',
  })
  rental_date: Date;

  @Column({
    type: 'int',
  })
  inventory_id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.rentals)
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @Column({
    type: 'int',
  })
  customer_id: number;

  @ManyToOne(() => Customer, (customer) => customer.rentals)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({
    type: 'timestamptz',
  })
  return_date: Date;

  @Column({
    type: 'int',
  })
  staff_id: number;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  last_update: Date;
}
