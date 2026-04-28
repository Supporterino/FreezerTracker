import { Module } from '@nestjs/common';
import { FreezersService } from './freezers.service';
import { FreezersController } from './freezers.controller';
import { HouseholdsModule } from '../households/households.module';

@Module({
  imports: [HouseholdsModule],
  controllers: [FreezersController],
  providers: [FreezersService],
  exports: [FreezersService],
})
export class FreezersModule {}
