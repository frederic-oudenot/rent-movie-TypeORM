import { DataSource } from 'typeorm';
import { Rental } from './entity/rental.entity';

export const rentalProviders = [
  {
    provide: 'RENTAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rental),
    inject: ['DATA_SOURCE'],
  },
];
