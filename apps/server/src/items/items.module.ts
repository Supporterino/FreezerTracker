import { Module } from '@nestjs/common';
import { ChangeLogModule } from '../change-log/change-log.module';
import { HouseholdsModule } from '../households/households.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [HouseholdsModule, ChangeLogModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
