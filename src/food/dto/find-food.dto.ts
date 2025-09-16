import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  NotContains,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BaseFoodDto } from './base/base-food.dto';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

export class FindFoodDto extends PickType(BaseResponseDto, [
  'result',
  'message',
] as const) {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => BaseFoodDto)
  @ApiProperty({
    type: BaseFoodDto,
    description: '식품 정보',
    required: true,
    example: {
      id: 1,
      food_code: 'D000006',
      group_name: '구이류',
      food_name: '꿩불고기',
      research_year: '2019',
      maker_name: '충주',
      ref_name: '외식영양성분자료집 통합본(2012-2017년)',
      serving_size: 500,
      calorie: 368.8,
      carbohydrate: 39.7,
      protein: 33.5,
      province: 8.5,
      sugars: 16.9,
      salt: 1264.31,
      cholesterol: 106.18,
      saturated_fatty_acids: 1.9,
      trans_fat: 0.1,
      updatedAt: '2025-09-16T14:49:42.787Z',
      createdAt: '2025-09-16T14:49:42.787Z',
    },
  })
  readonly food: BaseFoodDto;

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

export class FindAllFoodDto extends PickType(BaseResponseDto, [
  'result',
  'message',
] as const) {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => BaseFoodDto)
  @ApiProperty({
    type: BaseFoodDto,
    description: '식품 정보',
    required: true,
    example: [
      {
        id: 1,
        food_code: 'D000006',
        group_name: '구이류',
        food_name: '꿩불고기',
        research_year: '2019',
        maker_name: '충주',
        ref_name: '외식영양성분자료집 통합본(2012-2017년)',
        serving_size: 500,
        calorie: 368.8,
        carbohydrate: 39.7,
        protein: 33.5,
        province: 8.5,
        sugars: 16.9,
        salt: 1264.31,
        cholesterol: 106.18,
        saturated_fatty_acids: 1.9,
        trans_fat: 0.1,
        updatedAt: '2025-09-16T14:49:42.787Z',
        createdAt: '2025-09-16T14:49:42.787Z',
      },
    ],
  })
  readonly foods: BaseFoodDto[];

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
