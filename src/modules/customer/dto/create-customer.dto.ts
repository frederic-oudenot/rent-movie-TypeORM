import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty() // Check not to be empty
  @MaxLength(45) // Check max length
  @ApiProperty({ example: 'Antoine' })
  readonly first_name: string;

  @IsNotEmpty() // Check not to be empty
  @MaxLength(45) // Check max length
  @ApiProperty({ example: 'Dupont' })
  readonly last_name: string;

  @IsNotEmpty() // Check not to be empty
  @IsEmail() // Check format mail
  @MaxLength(50) // Check max length
  @ApiProperty({ example: 'a.dupont@rugby7.fr' })
  readonly email: string;
}
