import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateRentalDto {
  @IsNotEmpty() // Check not to be empty
  @IsNumberString() // Check format id
  @ApiProperty({ name: 'filmId', example: 1, required: true })
  readonly filmId: number;

  @IsNotEmpty() // Check not to be empty
  @IsNumberString() // Check format id
  @ApiProperty({ name: 'customerId', example: 1, required: true })
  readonly customerId: number;

  @IsNotEmpty() // Check not to be empty
  @IsDateString() // Check format date
  @ApiProperty({
    name: 'rentalDate',
    example: '09-08-2024T20:00:00',
    required: true,
  })
  readonly rentalDate: Date;

  @IsNotEmpty() // Check not to be empty
  @IsDateString() // Check format date
  @ApiProperty({
    name: 'returnDate',
    example: '19-08-2024T20:00:00',
    required: true,
  })
  readonly returnDate: Date;
}
