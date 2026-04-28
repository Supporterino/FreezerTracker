import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseholdDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;
}
