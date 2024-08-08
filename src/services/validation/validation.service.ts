import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class FindOneParams {
  @ApiProperty({ name: 'id', required: true })
  @IsNumberString()
  readonly id: number;
}

export class RentalaAttributesDB {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ name: 'inventory_id', required: true })
  readonly inventory_id: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ name: 'customer_id', required: true })
  readonly customer_id: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    name: 'rental_date',
    example: '09-08-2024T20:00:00',
    required: true,
  })
  readonly rental_date: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    name: 'return_date',
    example: '19-08-2024T20:00:00',
    required: true,
  })
  readonly return_date: Date;
}
