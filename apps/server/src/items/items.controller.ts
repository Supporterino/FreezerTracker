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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { type AuthenticatedUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { HouseholdMemberGuard } from '../households/guards/household-member.guard';
import { HouseholdOwnerGuard } from '../households/guards/household-owner.guard';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemQueryDto } from './dto/item-query.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

/**
 * Controller for freezer item CRUD, archive management,
 * and change history retrieval.
 */
@ApiTags('items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /** Create a new freezer item. */
  @Post()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Create a new freezer item' })
  @ApiResponse({ status: 201, description: 'Item created' })
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('hid') hid: string,
    @Body() dto: CreateItemDto,
  ) {
    return this.itemsService.create(user.userId, hid, dto);
  }

  /** List active items with optional filters and pagination. */
  @Get()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List active items with optional filters' })
  findAll(@Param('hid') hid: string, @Query() query: ItemQueryDto) {
    return this.itemsService.findAll(hid, query);
  }

  /** List archived (soft-deleted) items. */
  @Get('archive')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List soft-deleted (archived) items' })
  findArchive(@Param('hid') hid: string) {
    return this.itemsService.findArchive(hid);
  }

  /** Get a single active item by ID. */
  @Get(':iid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get a single active item' })
  findOne(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.findOne(hid, iid);
  }

  /** Update item fields and record change history. */
  @Patch(':iid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Update item (triggers change log)' })
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('hid') hid: string,
    @Param('iid') iid: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.itemsService.update(user.userId, hid, iid, dto);
  }

  /** Soft-delete an item (move to archive). */
  @Delete(':iid')
  @UseGuards(HouseholdMemberGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete item' })
  softDelete(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.softDelete(hid, iid);
  }

  /** Permanently delete an item from the archive (owner only). */
  @Delete(':iid/permanent')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hard-delete item from archive (owner only)' })
  hardDelete(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.hardDelete(hid, iid);
  }

  /** Get the change log history for an item. */
  @Get(':iid/history')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get change log history for an item' })
  getHistory(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.getHistory(hid, iid);
  }
}
