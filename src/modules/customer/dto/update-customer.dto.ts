import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Update Class is extended partially by Create Class
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional() // Optional
  @MaxLength(45) // Check max length
  @ApiProperty({ example: 'Antoine', required: false })
  readonly first_name: string;

  @IsOptional() // Optional
  @MaxLength(45) // Check max length
  @ApiProperty({ example: 'Dupont', required: false })
  readonly last_name: string;

  @IsNotEmpty() // Check value not empty
  @IsEmail() // Check format mail
  @MaxLength(50) // Check max length
  @ApiProperty({ example: 'a.dupont@rugby7.fr' })
  readonly email: string;
}
