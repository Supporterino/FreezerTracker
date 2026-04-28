import { Module } from '@nestjs/common';
import { HouseholdsModule } from '../households/households.module';
import { CompartmentsController } from './compartments.controller';
import { CompartmentsService } from './compartments.service';

@Module({
  imports: [HouseholdsModule],
  controllers: [CompartmentsController],
  providers: [CompartmentsService],
  exports: [CompartmentsService],
})
export class CompartmentsModule {}
