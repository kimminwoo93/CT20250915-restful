import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  NotContains,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseHateoasDto } from './base-hateoas.dto';

export class BaseResponseDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['ok', 'error'])
  @ApiProperty({
    type: String,
    description: '결과',
    required: true,
    example: 'ok',
    enum: ['ok', 'error'],
  })
  readonly result: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '메시지',
    required: true,
    example: 'message',
  })
  readonly message: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BaseHateoasDto)
  @ApiPropertyOptional({
    type: [BaseHateoasDto],
    description: '동적 리소스',
    example: [
      {
        rel: 'create',
        href: 'http://localhost/v1/food',
      },
    ],
  })
  readonly links?: BaseHateoasDto[];

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '타임스탬프',
    required: true,
    example: '2025-09-16T14:49:42.787Z',
  })
  readonly timestamp: string;
}

export class BaseErrorResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '결과',
    required: true,
    example: 'error',
  })
  readonly result: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '메시지',
    required: true,
    example: 'message',
  })
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '요청 경로',
    required: true,
    example: '/v1/sample/',
  })
  readonly path: string;
}
