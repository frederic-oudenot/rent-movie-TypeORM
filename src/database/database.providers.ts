import { DataSource } from 'typeorm';
import { Rental } from 'src/modules/rental/entity/rental.entity';
import { Film } from 'src/modules/film/entity/film.entity';
import { Inventory } from 'src/modules/inventory/entity/inventory.entity';
import { Customer } from 'src/modules/customer/entity/customer.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE', // Define Data Source into provider
    useFactory: async () => {
      try {
        // Init function useFactory to create the data source instance
        const dataSource = new DataSource({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [Rental, Film, Customer, Inventory],
        });
        // Init dataSource - Connect to db
        dataSource.initialize();
        console.log('🚀 ~ Ready to take off ! 🚀 ~ Sky has no limit !');
        // return connection to project
        return dataSource;
      } catch (error) {
        console.error('Error during Data Source initialization', error);
      }
    },
  },
];
