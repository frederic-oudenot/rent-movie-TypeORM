import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { inventoryProviders } from './inventory.providers';
import { InventoryController } from './inventory.controller';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, ...inventoryProviders],
  exports: [InventoryService],
})
export class InventoryModule {}
