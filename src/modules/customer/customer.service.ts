import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY') // Inject provide Customer
    private customerRepository: Repository<Customer>, // Get customer table repository to interact with db
  ) {}

  // Get all customers
  async findAll(): Promise<Customer[]> {
    const results = await this.customerRepository.find({
      relations: ['rentals'],
    });
    return results;
  }

  //Get one customer
  async findOne(id: number): Promise<Customer> {
    const results = await this.customerRepository.findOne({
      where: { customer_id: id },
      relations: ['rentals', 'rentals.inventory', 'rentals.inventory.film'],
    });
    return results;
  }

  // Get customer by email
  async findEmail(email: string): Promise<Customer> {
    const results = await this.customerRepository.findOne({
      where: { email: email },
    });
    return results;
  }

  // Update customer account
  async Update(id: number, data: UpdateCustomerDto): Promise<number> {
    const result = await this.customerRepository
      .createQueryBuilder()
      .update(Customer)
      .set({
        ...data,
      })
      .where('customer_id= :customer_id', { customer_id: id })
      .execute();

    return result?.affected;
  }

  // Create customer account
  async Create(data: CreateCustomerDto): Promise<ObjectLiteral[]> {
    const result = await this.customerRepository
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values({ ...data })
      .execute();
    return result?.identifiers;
  }
}
