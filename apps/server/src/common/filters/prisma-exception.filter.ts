import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Prisma } from '../../generated/prisma';

/**
 * Global exception filter that maps Prisma-specific errors to appropriate HTTP responses.
 *
 * - P2025 (Record not found)      -> 404 Not Found
 * - P2002 (Unique constraint)     -> 409 Conflict
 * - P2003 (Foreign key constraint) -> 400 Bad Request
 * - All others                    -> 500 Internal Server Error
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);
  constructor() {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let message: string;

    switch (exception.code) {
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found';
        break;
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'A record with this value already exists';
        break;
      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid reference: related resource does not exist';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'An unexpected database error occurred';
    }

    this.logger.error(
      {
        prismaCode: exception.code,
        prismaMessage: exception.message,
        meta: exception.meta,
        url: request.url,
        method: request.method,
      },
      `Prisma error ${exception.code} on ${request.method} ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status],
    });
  }
}
