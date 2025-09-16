import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal Server Error';

    // HttpException 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma - Known error
      // P2002 등의 오류, 제약 조건 위반 또는 잘못된 쿼리
      status = HttpStatus.BAD_REQUEST; // DB 관련 잘못된 요청
      message = `DB error: ${exception.message}`;
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      // Prisma - Unknown error
      // 연결, 네트워크 등의 문제
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = `DB unknown error: ${exception.message}`;
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      // Prisma - Rust panic error
      // 쿼리 시 엔진 충돌 문제
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = `DB crash: ${exception.message}`;
    } else if (exception instanceof Error) {
      // 기타 오류
      message = exception.message;
    }

    // 응답 구조
    res.status(status).json({
      result: 'error',
      message,
      path: req.url,
      statusCode: status,
      timestamp: DateTime.utc().toISO(),
    });
  }
}
