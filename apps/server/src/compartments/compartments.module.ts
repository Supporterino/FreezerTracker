import { Module } from '@nestjs/common';
import { CompartmentsService } from './compartments.service';
import { CompartmentsController } from './compartments.controller';
import { HouseholdsModule } from '../households/households.module';

@Module({
  imports: [HouseholdsModule],
  controllers: [CompartmentsController],
  providers: [CompartmentsService],
  exports: [CompartmentsService],
})
export class CompartmentsModule {}
