import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from '../../film/entity/film.entity';
import { Rental } from 'src/modules/rental/entity/rental.entity';

// TypeORM entity Inventory
@Entity({ name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @Column({
    type: 'int',
  })
  film_id: number;

  @ManyToOne(() => Film, (film) => film.inventories, { nullable: false })
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @Column({
    type: 'int',
  })
  store_id: number;

  @OneToMany(() => Rental, (rental) => rental.inventory, { nullable: false })
  rentals: Rental[];

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  last_update: Date;
}
