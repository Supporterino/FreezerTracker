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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { type AuthenticatedUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { HouseholdMemberGuard } from '../households/guards/household-member.guard';
import { AddPlannedItemDto } from './dto/add-planned-item.dto';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { MealPlanQueryDto } from './dto/meal-plan-query.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { MealPlansService } from './meal-plans.service';

@ApiTags('meal-plans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('households/:hid/meal-plans')
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Post()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Create a meal plan' })
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Param('hid') hid: string,
    @Body() dto: CreateMealPlanDto,
  ) {
    return this.mealPlansService.create(user.userId, hid, dto);
  }

  @Get()
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'List meal plans with optional date filters' })
  findAll(@Param('hid') hid: string, @Query() query: MealPlanQueryDto) {
    return this.mealPlansService.findAll(hid, query);
  }

  @Get(':mpid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Get a single meal plan' })
  findOne(@Param('hid') hid: string, @Param('mpid') mpid: string) {
    return this.mealPlansService.findOne(hid, mpid);
  }

  @Patch(':mpid')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Update a meal plan' })
  update(@Param('hid') hid: string, @Param('mpid') mpid: string, @Body() dto: UpdateMealPlanDto) {
    return this.mealPlansService.update(hid, mpid, dto);
  }

  @Delete(':mpid')
  @UseGuards(HouseholdMemberGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a meal plan' })
  remove(@Param('hid') hid: string, @Param('mpid') mpid: string) {
    return this.mealPlansService.remove(hid, mpid);
  }

  @Post(':mpid/items')
  @UseGuards(HouseholdMemberGuard)
  @ApiOperation({ summary: 'Add an item to a meal plan' })
  addItem(@Param('hid') hid: string, @Param('mpid') mpid: string, @Body() dto: AddPlannedItemDto) {
    return this.mealPlansService.addItem(hid, mpid, dto.itemId);
  }

  @Delete(':mpid/items/:piid')
  @UseGuards(HouseholdMemberGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove an item from a meal plan' })
  removeItem(@Param('hid') hid: string, @Param('mpid') mpid: string, @Param('piid') piid: string) {
    return this.mealPlansService.removeItem(hid, mpid, piid);
  }
}
