import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AddPlannedItemDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  itemId!: string;
}
