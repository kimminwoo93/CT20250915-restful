import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class BaseHateoasDto {
  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '관계',
    required: true,
    example: 'create',
  })
  readonly rel: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '하이퍼 레퍼런스',
    required: true,
    example: 'http://localhost/v1/food',
  })
  readonly href: string;
}
