import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { HouseholdMemberGuard } from './guards/household-member.guard';
import { HouseholdOwnerGuard } from './guards/household-owner.guard';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdMemberGuard, HouseholdOwnerGuard],
  exports: [HouseholdsService, HouseholdMemberGuard, HouseholdOwnerGuard],
})
export class HouseholdsModule {}
