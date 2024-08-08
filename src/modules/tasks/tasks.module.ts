import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

import { RentalModule } from '../rental/rental.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [RentalModule, CustomerModule],
})
export class TasksModule {}
