import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as grpc from 'grpc';

export interface IRpcException {
  message: string;
  code: number;
}

// export class FitRpcException extends RpcException implements IRpcException {
//   public status: number;
//
//   constructor(message: string, statusCode: HttpStatus) {
//     super(message);
//     this.initStatusCode(statusCode);
//   }
//
//   private initStatusCode(statusCode: HttpStatus) {
//     this.status = statusCode;
//   }
// }

export const GrpcToHttpExceptionMapping: Record<string, HttpStatus> = {
  [grpc.status.OK]:                  HttpStatus.OK,
  [grpc.status.CANCELLED]:           HttpStatus.INTERNAL_SERVER_ERROR,
  [grpc.status.UNKNOWN]:             HttpStatus.INTERNAL_SERVER_ERROR,
  [grpc.status.INVALID_ARGUMENT]:    HttpStatus.BAD_REQUEST,
  [grpc.status.DEADLINE_EXCEEDED]:   HttpStatus.GATEWAY_TIMEOUT,
  [grpc.status.NOT_FOUND]:           HttpStatus.NOT_FOUND,
  [grpc.status.ALREADY_EXISTS]:      HttpStatus.CONFLICT,
  [grpc.status.PERMISSION_DENIED]:   HttpStatus.FORBIDDEN,
  [grpc.status.UNAUTHENTICATED]:     HttpStatus.UNAUTHORIZED,
  [grpc.status.RESOURCE_EXHAUSTED]:  HttpStatus.TOO_MANY_REQUESTS,
  [grpc.status.FAILED_PRECONDITION]: HttpStatus.BAD_REQUEST,
  [grpc.status.ABORTED]:             HttpStatus.CONFLICT,
  [grpc.status.OUT_OF_RANGE]:        HttpStatus.BAD_REQUEST,
  [grpc.status.UNIMPLEMENTED]:       HttpStatus.NOT_IMPLEMENTED,
  [grpc.status.INTERNAL]:            HttpStatus.INTERNAL_SERVER_ERROR,
  [grpc.status.UNAVAILABLE]:         HttpStatus.SERVICE_UNAVAILABLE,
  [grpc.status.DATA_LOSS]:           HttpStatus.INTERNAL_SERVER_ERROR,
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
