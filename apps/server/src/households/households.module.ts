import { Module } from '@nestjs/common';
import { HouseholdMemberGuard } from './guards/household-member.guard';
import { HouseholdOwnerGuard } from './guards/household-owner.guard';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdMemberGuard, HouseholdOwnerGuard],
  exports: [HouseholdsService, HouseholdMemberGuard, HouseholdOwnerGuard],
})
export class HouseholdsModule {}
