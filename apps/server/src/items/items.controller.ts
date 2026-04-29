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
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HouseholdMemberGuard } from '../households/guards/household-member.guard';
import { HouseholdOwnerGuard } from '../households/guards/household-owner.guard';
import type { CreateItemDto } from './dto/create-item.dto';
import type { ItemQueryDto } from './dto/item-query.dto';
import type { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@ApiTags('items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Create a new freezer item' })
  @ApiResponse({ status: 201, description: 'Item created' })
  create(@Request() req: any, @Param('hid') hid: string, @Body() dto: CreateItemDto) {
    return this.itemsService.create(req.user.userId, hid, dto);
  }

  @Get()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List active items with optional filters' })
  findAll(@Param('hid') hid: string, @Query() query: ItemQueryDto) {
    return this.itemsService.findAll(hid, query);
  }

  @Get('archive')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List soft-deleted (archived) items' })
  findArchive(@Param('hid') hid: string) {
    return this.itemsService.findArchive(hid);
  }

  @Get(':iid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get a single active item' })
  findOne(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.findOne(hid, iid);
  }

  @Patch(':iid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Update item (triggers change log)' })
  update(
    @Request() req: any,
    @Param('hid') hid: string,
    @Param('iid') iid: string,
    @Body() dto: UpdateItemDto,
  ) {
    return this.itemsService.update(req.user.userId, hid, iid, dto);
  }

  @Delete(':iid')
  @UseGuards(HouseholdMemberGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft-delete item' })
  softDelete(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.softDelete(hid, iid);
  }

  @Delete(':iid/permanent')
  @UseGuards(HouseholdOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hard-delete item from archive (owner only)' })
  hardDelete(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.hardDelete(hid, iid);
  }

  @Get(':iid/history')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get change log history for an item' })
  getHistory(@Param('hid') hid: string, @Param('iid') iid: string) {
    return this.itemsService.getHistory(hid, iid);
  }
}
