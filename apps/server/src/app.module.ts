import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HouseholdsModule } from './households/households.module';
import { InvitesModule } from './invites/invites.module';
import { FreezersModule } from './freezers/freezers.module';
import { CompartmentsModule } from './compartments/compartments.module';
import { ChangeLogModule } from './change-log/change-log.module';
import { ItemsModule } from './items/items.module';

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
