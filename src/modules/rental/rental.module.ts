import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { rentalProviders } from './rental.provider';
import { RentalService } from './rental.service';
import { FilmModule } from '../film/film.module';
import { CustomerModule } from '../customer/customer.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  controllers: [RentalController],
  providers: [RentalService, ...rentalProviders],
  imports: [FilmModule, CustomerModule, InventoryModule],
  exports: [RentalService],
})
export class RentalModule {}
