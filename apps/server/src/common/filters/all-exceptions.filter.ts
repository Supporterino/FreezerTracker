import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * Catch-all exception filter that ensures every unhandled error is logged
 * with full context and returns a sanitized response to the client.
 *
 * HttpExceptions pass through with their original status/message.
 * Unknown exceptions are logged at ERROR level and return a generic 500.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      // Only log server errors at error level; client errors at warn
      if (status >= 500) {
        this.logger.error(
          { status, url: request.url, method: request.method, stack: exception.stack },
          `Unhandled HttpException: ${exception.message}`,
        );
      }
      response.status(status).json(body);
      return;
    }

    // Unknown / unexpected errors — log full details, return generic message
    const error = exception instanceof Error ? exception : new Error(String(exception));
    this.logger.error(
      {
        error: error.message,
        stack: error.stack,
        url: request.url,
        method: request.method,
      },
      `Unhandled exception on ${request.method} ${request.url}: ${error.message}`,
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
