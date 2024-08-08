import { Inventory } from 'src/modules/inventory/entity/inventory.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TypeORM entity Film
@Entity({ name: 'film' })
export class Film {
  @PrimaryGeneratedColumn()
  film_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  release_year: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  language_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  original_language_id: number;

  @Column({
    type: 'smallint',
    default: 3,
  })
  rental_duration: number;

  @Column({
    type: 'numeric',
    precision: 4,
    scale: 2,
    default: 4.99,
  })
  rental_rate: number;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  length: number;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 19.99,
  })
  replacement_cost: number;

  @Column({
    type: 'varchar',
    length: 5,
    default: 'G',
  })
  rating: string;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  last_update: Date;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  })
  special_features: string[];

  @Column({
    type: 'tsvector',
  })
  fulltext: string;

  @OneToMany(() => Inventory, (inventory) => inventory.film)
  inventories: Inventory[];
}
