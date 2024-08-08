import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateInventoryDto {
  @IsNumberString() // Check format id
  @IsNotEmpty() // Check not to be empty
  @ApiProperty({
    examples: [1, 2],
  })
  readonly store_id: number;

  @IsNumberString() // Check format id
  @IsNotEmpty() // Check not to be empty
  @ApiProperty({
    required: true,
    example: 1,
  })
  readonly film_id: number;
}
