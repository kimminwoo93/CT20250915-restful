import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  NotContains,
} from 'class-validator';

export class BaseFoodDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '번호',
    required: true,
    example: 1,
  })
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '식품코드',
    required: true,
    example: 'D000006',
  })
  readonly food_code: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '식품군',
    required: true,
    example: '구이류',
  })
  readonly group_name: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '식품이름',
    required: true,
    example: '꿩불고기',
  })
  readonly food_name: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '조사년도',
    required: true,
    example: '2019',
  })
  readonly research_year: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '지역/제조사',
    required: true,
    example: '충주',
  })
  readonly maker_name: string;

  @IsString()
  @IsNotEmpty()
  @NotContains(' ')
  @ApiProperty({
    type: String,
    description: '자료출처',
    required: true,
    example: '외식영양성분자료집 통합본(2012-2017년)',
  })
  readonly ref_name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: '1회 제공량',
    required: true,
    example: 500,
  })
  readonly serving_size: number;

  @ApiProperty({
    description: '열량(kcal)(1회제공량당)',
    required: true,
    example: 368.8,
  })
  readonly calorie: number | null;

  @ApiProperty({
    description: '탄수화물(g)(1회제공량당)',
    required: true,
    example: 39.7,
  })
  readonly carbohydrate: number | null;

  @ApiProperty({
    description: '단백질(g)(1회제공량당)',
    required: true,
    example: 33.5,
  })
  readonly protein: number | null;

  @ApiProperty({
    description: '지방(g)(1회제공량당)',
    required: true,
    example: 8.5,
  })
  readonly province: number | null;

  @ApiProperty({
    description: '총당류(g)(1회제공량당)',
    required: true,
    example: 16.9,
  })
  readonly sugars: number | null;

  @ApiProperty({
    description: '나트륨(mg)(1회제공량당)',
    required: true,
    example: 1264.31,
  })
  readonly salt: number | null;

  @ApiProperty({
    description: '콜레스테롤(mg)(1회제공량당)',
    required: true,
    example: 106.18,
  })
  readonly cholesterol: number | null;

  @ApiProperty({
    description: '포화지방산(g)(1회제공량당)',
    required: true,
    example: 1.9,
  })
  readonly saturated_fatty_acids: number | null;

  @ApiProperty({
    description: '트랜스지방(g)(1회제공량당)',
    required: true,
    example: 0.1,
  })
  readonly trans_fat: number | null;
}
