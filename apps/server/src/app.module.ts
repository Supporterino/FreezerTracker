import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ChangeLogModule } from './change-log/change-log.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CompartmentsModule } from './compartments/compartments.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { FreezersModule } from './freezers/freezers.module';
import { HealthModule } from './health/health.module';
import { HouseholdsModule } from './households/households.module';
import { InvitesModule } from './invites/invites.module';
import { ItemsModule } from './items/items.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          level: config.get('nodeEnv') === 'production' ? 'info' : 'debug',
          transport:
            config.get('nodeEnv') !== 'production'
              ? { target: 'pino-pretty', options: { colorize: true, singleLine: true } }
              : undefined,
          // Redact sensitive fields from automatic request logging
          redact: {
            paths: [
              'req.headers.authorization',
              'req.body.password',
              'req.body.refreshToken',
              'req.body.token',
            ],
            censor: '[REDACTED]',
          },
          serializers: {
            req: (req: any) => ({
              id: req.id,
              method: req.method,
              url: req.url,
              remoteAddress: req.remoteAddress,
            }),
          },
        },
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
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
    MealPlansModule,
    HealthModule,
  ],
  providers: [LoggingInterceptor, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
