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
import { type AuthenticatedUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { TransferOwnershipDto } from './dto/transfer-ownership.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { HouseholdMemberGuard } from './guards/household-member.guard';
import { HouseholdOwnerGuard } from './guards/household-owner.guard';
import { HouseholdsService } from './households.service';

/**
 * Controller for household CRUD, member management, and ownership transfer.
 */
@ApiTags('households')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households')
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  /** Create a new household with the current user as owner. */
  @Post()
  @ApiOperation({ summary: 'Create a new household' })
  @ApiResponse({ status: 201, description: 'Household created' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateHouseholdDto) {
    return this.householdsService.create(user.userId, dto);
  }

  /** List all households the current user belongs to. */
  @Get()
  @ApiOperation({ summary: 'List all households the current user belongs to' })
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.householdsService.findAll(user.userId);
  }

  /** Get household detail with member list. */
  @Get(':hid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get household detail with members' })
  findOne(@Param('hid') hid: string) {
    return this.householdsService.findOne(hid);
  }

  /** Update household name. */
  @Patch(':hid')
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'Update household name' })
  update(@Param('hid') hid: string, @Body() dto: UpdateHouseholdDto) {
    return this.householdsService.update(hid, dto);
  }

  /** Delete household and all related data (cascade). */
  @Delete(':hid')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete household and all related data' })
  remove(@Param('hid') hid: string) {
    return this.householdsService.remove(hid);
  }

  /** Remove a member from the household (owner only). */
  @Delete(':hid/members/:uid')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a member from the household' })
  removeMember(
    @Param('hid') hid: string,
    @Param('uid') uid: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.householdsService.removeMember(hid, uid, user.userId);
  }

  /** Transfer household ownership to another member. */
  @Patch(':hid/transfer')
  @UseGuards(HouseholdOwnerGuard)
  @ApiOperation({ summary: 'Transfer household ownership' })
  transferOwnership(@Param('hid') hid: string, @Body() dto: TransferOwnershipDto) {
    return this.householdsService.transferOwnership(hid, dto.newOwnerId);
  }
}
