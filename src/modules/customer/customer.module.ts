import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.provider';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProviders],
  exports: [CustomerService],
})
export class CustomerModule {}
