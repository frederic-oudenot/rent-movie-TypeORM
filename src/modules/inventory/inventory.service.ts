import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './entity/inventory.entity';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY') // Inject provide inventory
    private readonly inventoryRepository: Repository<ObjectLiteral[]>, // Get inventory repository to interact with db
  ) {}

  // Create link between film db and customer db
  async Create(data: CreateInventoryDto) {
    const results = await this.inventoryRepository
      .createQueryBuilder()
      .insert()
      .into(Inventory)
      .values({ ...data })
      .execute();
    return results.identifiers;
  }
}
