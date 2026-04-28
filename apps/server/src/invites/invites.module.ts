import { Module } from '@nestjs/common';
import { HouseholdsModule } from '../households/households.module';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';

@Module({
  imports: [HouseholdsModule],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
