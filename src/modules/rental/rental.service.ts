import { Inject, Injectable } from '@nestjs/common';
import { Rental } from './entity/rental.entity';
import { RentalaAttributesDB } from 'src/services/validation/validation.service';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class RentalService {
  constructor(
    @Inject('RENTAL_REPOSITORY') // Inject provide repository
    private readonly rentalRepository: Repository<Rental>, // Get rental table repository to interact with db
  ) {}

  // Get all rental data with all film data
  async findAll(): Promise<Rental[]> {
    const results = await this.rentalRepository.find({
      relations: ['inventory', 'inventory.film'],
    });
    return results;
  }

  // Get one rental data with all film data
  async findOne(id: number): Promise<Rental> {
    const results = await this.rentalRepository.findOne({
      where: { rental_id: id },
      relations: ['inventory', 'inventory.film', 'customer'],
    });
    return results;
  }

  // Get all data between two dates with relations
  async findRentalByStartAndEndTime(
    startTime: Date,
    endTime: Date,
  ): Promise<Rental[]> {
    const results = await this.rentalRepository
      .createQueryBuilder('rental')
      .innerJoinAndSelect('rental.inventory', 'inventory')
      .innerJoinAndSelect('rental.customer', 'customer')
      .innerJoinAndSelect('inventory.film', 'film')
      .where(`return_date >= :startTime`, { startTime })
      .andWhere(`return_date < :endTime`, { endTime })
      .getMany();
    return results;
  }

  // Create one rental data
  async Create(data: RentalaAttributesDB): Promise<ObjectLiteral> {
    const results = await this.rentalRepository
      .createQueryBuilder()
      .insert()
      .into(Rental)
      .values({ ...data })
      .execute();
    return results;
  }
}
