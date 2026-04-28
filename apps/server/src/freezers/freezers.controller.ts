import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../households/guards/household-member.guard';
import { HouseholdOwnerGuard } from '../households/guards/household-owner.guard';
import type { CreateFreezerDto } from './dto/create-freezer.dto';
import type { UpdateFreezerDto } from './dto/update-freezer.dto';
import type { FreezersService } from './freezers.service';

@ApiTags('freezers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/freezers')
export class FreezersController {
  constructor(private readonly freezersService: FreezersService) {}

  @Post()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Create a freezer' })
  @ApiResponse({ status: 201, description: 'Freezer created' })
  create(@Param('hid') hid: string, @Body() dto: CreateFreezerDto) {
    return this.freezersService.create(hid, dto);
  }

  @Get()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List all freezers in the household' })
  findAll(@Param('hid') hid: string) {
    return this.freezersService.findAll(hid);
  }

  @Get(':fid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get freezer with compartments' })
  findOne(@Param('hid') hid: string, @Param('fid') fid: string) {
    return this.freezersService.findOne(hid, fid);
  }

  @Patch(':fid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Update freezer name/description' })
  update(@Param('hid') hid: string, @Param('fid') fid: string, @Body() dto: UpdateFreezerDto) {
    return this.freezersService.update(hid, fid, dto);
  }

  @Delete(':fid')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete freezer (cascade compartments + items)' })
  remove(@Param('hid') hid: string, @Param('fid') fid: string) {
    return this.freezersService.remove(hid, fid);
  }
}
