import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rental } from 'src/modules/rental/entity/rental.entity';

// TypeORM entity Customer
@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ type: 'int' })
  store_id: number;

  @Column({
    type: 'varchar',
    length: 45,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 45,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  email: string;

  @Column({ type: 'int' })
  address_id: number;

  @Column({ type: 'boolean' })
  activebool: boolean;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  last_update: Date;

  @OneToMany(() => Rental, (rental) => rental.customer)
  rentals: Rental[];
}
