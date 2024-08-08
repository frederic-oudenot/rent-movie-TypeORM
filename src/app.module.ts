import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './modules/customer/customer.module';
import { FilmModule } from './modules/film/film.module';
import { RentalModule } from './modules/rental/rental.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    TasksModule,
    CustomerModule,
    FilmModule,
    RentalModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
