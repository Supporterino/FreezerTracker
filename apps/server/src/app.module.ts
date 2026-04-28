import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChangeLogModule } from './change-log/change-log.module';
import { CompartmentsModule } from './compartments/compartments.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { FreezersModule } from './freezers/freezers.module';
import { HouseholdsModule } from './households/households.module';
import { InvitesModule } from './invites/invites.module';
import { ItemsModule } from './items/items.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    HouseholdsModule,
    InvitesModule,
    FreezersModule,
    CompartmentsModule,
    ChangeLogModule,
    ItemsModule,
  ],
})
export class AppModule {}
