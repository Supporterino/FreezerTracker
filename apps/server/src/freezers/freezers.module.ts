import { Module } from '@nestjs/common';
import { HouseholdsModule } from '../households/households.module';
import { FreezersController } from './freezers.controller';
import { FreezersService } from './freezers.service';

@Module({
  imports: [HouseholdsModule],
  controllers: [FreezersController],
  providers: [FreezersService],
  exports: [FreezersService],
})
export class FreezersModule {}
