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
import { CompartmentsService } from './compartments.service';
import { CreateCompartmentDto } from './dto/create-compartment.dto';
import { UpdateCompartmentDto } from './dto/update-compartment.dto';

@ApiTags('compartments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/freezers/:fid/compartments')
export class CompartmentsController {
  constructor(private readonly compartmentsService: CompartmentsService) {}

  @Post()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Add a compartment to a freezer' })
  @ApiResponse({ status: 201, description: 'Compartment created' })
  create(@Param('hid') hid: string, @Param('fid') fid: string, @Body() dto: CreateCompartmentDto) {
    return this.compartmentsService.create(hid, fid, dto);
  }

  @Get()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List compartments ordered by position' })
  findAll(@Param('hid') hid: string, @Param('fid') fid: string) {
    return this.compartmentsService.findAll(hid, fid);
  }

  @Patch(':cid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Update compartment name or position' })
  update(
    @Param('hid') hid: string,
    @Param('fid') fid: string,
    @Param('cid') cid: string,
    @Body() dto: UpdateCompartmentDto,
  ) {
    return this.compartmentsService.update(hid, fid, cid, dto);
  }

  @Delete(':cid')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete compartment (blocked if has active items)' })
  remove(@Param('hid') hid: string, @Param('fid') fid: string, @Param('cid') cid: string) {
    return this.compartmentsService.remove(hid, fid, cid);
  }
}
