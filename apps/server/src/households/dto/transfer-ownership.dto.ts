import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class TransferOwnershipDto {
  @ApiProperty({ description: 'The user ID of the new household owner' })
  @IsString()
  @MinLength(1)
  newOwnerId!: string;
}
