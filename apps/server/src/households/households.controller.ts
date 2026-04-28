import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from './guards/household-member.guard';
import { HouseholdOwnerGuard } from './guards/household-owner.guard';
import { HouseholdsService } from './households.service';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';

@ApiTags('households')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households')
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new household' })
  @ApiResponse({ status: 201, description: 'Household created' })
  create(@Request() req: any, @Body() dto: CreateHouseholdDto) {
    return this.householdsService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all households the current user belongs to' })
  findAll(@Request() req: any) {
    return this.householdsService.findAll(req.user.userId);
  }

  @Get(':hid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get household detail with members' })
  findOne(@Param('hid') hid: string) {
    return this.householdsService.findOne(hid);
  }

  @Patch(':hid')
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'Update household name' })
  update(@Param('hid') hid: string, @Body() dto: UpdateHouseholdDto) {
    return this.householdsService.update(hid, dto);
  }

  @Delete(':hid')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete household and all related data' })
  remove(@Param('hid') hid: string) {
    return this.householdsService.remove(hid);
  }

  @Delete(':hid/members/:uid')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a member from the household' })
  removeMember(
    @Param('hid') hid: string,
    @Param('uid') uid: string,
    @Request() req: any,
  ) {
    return this.householdsService.removeMember(hid, uid, req.user.userId);
  }

  @Patch(':hid/transfer')
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'Transfer household ownership' })
  transferOwnership(
    @Param('hid') hid: string,
    @Body() body: { newOwnerId: string },
  ) {
    return this.householdsService.transferOwnership(hid, body.newOwnerId);
  }
}
