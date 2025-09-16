import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { BaseErrorResponseDto } from './base-response.dto';

export class BaseBadRequestErrorDto extends PickType(BaseErrorResponseDto, [
  'result',
  'message',
  'path',
] as const) {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '상태 코드',
    required: true,
    example: 400,
  })
  readonly statusCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '타임스탬프',
    required: true,
    example: '2025-09-16T14:49:42.787Z',
  })
  readonly timestamp: string;
}

export class BaseNotFoundErrorDto extends PickType(BaseErrorResponseDto, [
  'result',
  'message',
  'path',
] as const) {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '상태 코드',
    required: true,
    example: 404,
  })
  readonly statusCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '타임스탬프',
    required: true,
    example: '2025-09-16T14:49:42.787Z',
  })
  readonly timestamp: string;
}

export class BaseInternalServerErrorDto extends PickType(BaseErrorResponseDto, [
  'result',
  'message',
  'path',
] as const) {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '상태 코드',
    required: true,
    example: 500,
  })
  readonly statusCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '타임스탬프',
    required: true,
    example: '2025-09-16T14:49:42.787Z',
  })
  readonly timestamp: string;
}
