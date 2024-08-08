import { DataSource } from 'typeorm';
import { Inventory } from './entity/inventory.entity';

export const inventoryProviders = [
  {
    provide: 'INVENTORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Inventory),
    inject: ['DATA_SOURCE'],
  },
];
