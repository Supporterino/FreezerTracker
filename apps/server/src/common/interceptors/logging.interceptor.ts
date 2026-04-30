import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { type Observable, tap } from 'rxjs';

/**
 * Global interceptor that logs every HTTP request/response.
 *
 * Captures: method, URL, status code, response time, and userId (if authenticated).
 * Sensitive fields (password, token, refreshToken) are never logged.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('HTTP');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const userId: string | undefined = request.user?.userId;
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const duration = Date.now() - start;
          this.logger.info(
            { method, url, statusCode: response.statusCode, duration, userId },
            `${method} ${url} ${response.statusCode} ${duration}ms`,
          );
        },
        error: (error: Error) => {
          const duration = Date.now() - start;
          const statusCode = (error as any).status ?? (error as any).statusCode ?? 500;
          this.logger.error(
            { method, url, statusCode, duration, userId, error: error.message },
            `${method} ${url} ${statusCode} ${duration}ms`,
          );
        },
      }),
    );
  }
}
