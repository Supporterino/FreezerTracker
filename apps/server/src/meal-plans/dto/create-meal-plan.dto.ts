import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMealPlanDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name?: string;

  @ApiProperty()
  @IsDateString()
  plannedDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true as any })
  itemIds!: string[];
}
