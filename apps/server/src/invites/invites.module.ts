import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { HouseholdsModule } from '../households/households.module';

@Module({
  imports: [HouseholdsModule],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
