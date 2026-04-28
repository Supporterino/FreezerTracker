import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { HouseholdsModule } from '../households/households.module';
import { ChangeLogModule } from '../change-log/change-log.module';

@Module({
  imports: [HouseholdsModule, ChangeLogModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
