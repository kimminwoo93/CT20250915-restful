import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, NotContains } from 'class-validator';
import { CreateFoodDto } from './create-food.dto';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}

export class UpdateFoodResponseDto extends PickType(BaseResponseDto, [
  'result',
  'message',
] as const) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '번호',
    required: true,
    example: 1,
  })
  readonly updatedId: number;

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
