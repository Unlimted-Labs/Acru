import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.message
      : 'Internal server error';

    const code = exception instanceof HttpException
      ? (exception.getResponse() as { error?: string })?.error ?? 'HTTP_ERROR'
      : 'INTERNAL_ERROR';

    this.logger.error(`${request.method} ${request.url} → ${status}: ${message}`);

    response.status(status).json({
      error: {
        code,
        message,
        details: exception instanceof HttpException ? exception.getResponse() : undefined,
      },
    });
  }
}
