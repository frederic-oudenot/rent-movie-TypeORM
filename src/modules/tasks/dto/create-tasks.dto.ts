import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    examples: ['d-3', 'd-5'],
  })
  notifications: string;
}
