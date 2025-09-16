import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { FoodService } from './food.service';
import { CreateFoodDto, CreateFoodResponseDto } from './dto/create-food.dto';
import { UpdateFoodDto, UpdateFoodResponseDto } from './dto/update-food.dto';
import { FindAllFoodDto, FindFoodDto } from './dto/find-food.dto';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import {
  BaseBadRequestErrorDto,
  BaseInternalServerErrorDto,
  BaseNotFoundErrorDto,
} from 'src/common/dto/base-error.dto';

@ApiTags('Food')
@UseInterceptors(CacheInterceptor)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Version('1')
  @ApiExtraModels(FindAllFoodDto)
  @ApiOperation({
    summary: '모든 식품 정보 조회',
    description: 'DB에 저장된 모든 식품 정보를 조회합니다.',
  })
  @ApiOkResponse({
    description: 'ok',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(FindAllFoodDto),
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: '서버 오류',
    type: BaseInternalServerErrorDto,
  })
  @CacheKey('all_foods_info')
  @CacheTTL(120)
  @Get('/info/all')
  async findAll(): Promise<FindAllFoodDto> {
    return await this.foodService.findAll();
  }

  @Version('1')
  @ApiExtraModels(FindFoodDto)
  @ApiOperation({
    summary: '특정 식품 정보 조회',
    description: 'DB에 저장된 특정 식품 정보를 조회합니다.',
  })
  @ApiQuery({
    type: String,
    name: 'food_name',
    description: '식품이름',
    required: true,
    example: '꿩불고기',
  })
  @ApiQuery({
    type: String,
    name: 'research_year',
    description: '연도(YYYY)',
    required: true,
    example: '2019',
  })
  @ApiQuery({
    type: String,
    name: 'maker_name',
    description: '지역/제조사',
    required: true,
    example: '충주',
  })
  @ApiQuery({
    type: String,
    name: 'food_code',
    description: '식품코드',
    required: true,
    example: 'D000006',
  })
  @ApiOkResponse({
    description: 'ok',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(FindFoodDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BaseBadRequestErrorDto,
  })
  @ApiNotFoundResponse({
    description: '리소스 찾을 수 없음',
    type: BaseNotFoundErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 오류',
    type: BaseInternalServerErrorDto,
  })
  @CacheKey('food_info')
  @CacheTTL(120)
  @Get('/info')
  async findOne(
    @Query('food_name') food_name: string,
    @Query('research_year') research_year: string,
    @Query('maker_name') maker_name: string,
    @Query('food_code') food_code: string,
  ): Promise<FindFoodDto> {
    return await this.foodService.findOne(
      food_name,
      research_year,
      maker_name,
      food_code,
    );
  }

  @Version('1')
  @ApiExtraModels(CreateFoodResponseDto)
  @ApiOperation({
    summary: '식품 정보 생성',
    description: 'DB에 식품 정보를 저장합니다.',
  })
  @ApiBody({ type: CreateFoodDto })
  @ApiCreatedResponse({
    description: 'created',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(CreateFoodResponseDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BaseBadRequestErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 오류',
    type: BaseInternalServerErrorDto,
  })
  @Post('/info')
  async create(@Body() dto: CreateFoodDto): Promise<CreateFoodResponseDto> {
    return await this.foodService.create(dto);
  }

  @Version('1')
  @ApiExtraModels(UpdateFoodResponseDto)
  @ApiOperation({
    summary: '식품 정보 업데이트',
    description: 'DB에 저장된 식품 정보를 업데이트합니다.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    description: '번호',
    required: true,
    example: 1,
  })
  @ApiBody({ type: UpdateFoodDto })
  @ApiOkResponse({
    description: 'ok',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(UpdateFoodResponseDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BaseBadRequestErrorDto,
  })
  @ApiNotFoundResponse({
    description: '리소스 찾을 수 없음',
    type: BaseNotFoundErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 오류',
    type: BaseInternalServerErrorDto,
  })
  @Put('/info/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFoodDto,
  ): Promise<UpdateFoodResponseDto> {
    return await this.foodService.update(id, dto);
  }

  @Version('1')
  @ApiExtraModels(BaseResponseDto)
  @ApiOperation({
    summary: '식품 정보 제거',
    description: 'DB에서 특정 식품 정보를 제거합니다.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    description: '번호',
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    description: 'ok',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(BaseResponseDto),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청',
    type: BaseBadRequestErrorDto,
  })
  @ApiNotFoundResponse({
    description: '리소스 찾을 수 없음',
    type: BaseNotFoundErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 오류',
    type: BaseInternalServerErrorDto,
  })
  @Delete('/info/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BaseResponseDto> {
    return await this.foodService.remove(id);
  }
}
