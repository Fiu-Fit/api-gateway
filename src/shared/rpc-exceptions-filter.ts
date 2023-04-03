import { status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface IRpcException {
  message: string;
  code: number;
}

export const GrpcToHttpExceptionMapping: Record<string, HttpStatus> = {
  [status.OK]:                  HttpStatus.OK,
  [status.CANCELLED]:           HttpStatus.INTERNAL_SERVER_ERROR,
  [status.UNKNOWN]:             HttpStatus.INTERNAL_SERVER_ERROR,
  [status.INVALID_ARGUMENT]:    HttpStatus.BAD_REQUEST,
  [status.DEADLINE_EXCEEDED]:   HttpStatus.GATEWAY_TIMEOUT,
  [status.NOT_FOUND]:           HttpStatus.NOT_FOUND,
  [status.ALREADY_EXISTS]:      HttpStatus.CONFLICT,
  [status.PERMISSION_DENIED]:   HttpStatus.FORBIDDEN,
  [status.UNAUTHENTICATED]:     HttpStatus.UNAUTHORIZED,
  [status.RESOURCE_EXHAUSTED]:  HttpStatus.TOO_MANY_REQUESTS,
  [status.FAILED_PRECONDITION]: HttpStatus.BAD_REQUEST,
  [status.ABORTED]:             HttpStatus.CONFLICT,
  [status.OUT_OF_RANGE]:        HttpStatus.BAD_REQUEST,
  [status.UNIMPLEMENTED]:       HttpStatus.NOT_IMPLEMENTED,
  [status.INTERNAL]:            HttpStatus.INTERNAL_SERVER_ERROR,
  [status.UNAVAILABLE]:         HttpStatus.SERVICE_UNAVAILABLE,
  [status.DATA_LOSS]:           HttpStatus.INTERNAL_SERVER_ERROR,
};

@Catch()
export class AllGlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: IRpcException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.code
      ? GrpcToHttpExceptionMapping[exception.code.toString()]
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp:  new Date().toISOString(),
      path:       httpAdapter.getRequestUrl(ctx.getRequest()),
      message:    exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
