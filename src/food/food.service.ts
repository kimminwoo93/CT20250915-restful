import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateTime } from 'luxon';
import { CreateFoodDto, CreateFoodResponseDto } from './dto/create-food.dto';
import { UpdateFoodDto, UpdateFoodResponseDto } from './dto/update-food.dto';
import { FindAllFoodDto, FindFoodDto } from './dto/find-food.dto';
import { FoodEntity } from './entities/food.entity';
import { Food } from './interfaces/food.interface';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FindAllFoodDto> {
    const foods: Food[] = await this.prisma.food.findMany();

    return {
      result: 'ok',
      message: 'Found',
      foods,
      timestamp: DateTime.utc().toISO(),
    };
  }

  async findOne(
    food_name: string,
    research_year: string,
    maker_name: string,
    food_code: string,
  ): Promise<FindFoodDto> {
    // findMany() 사용
    // 전달되는 인자를 모두 사용해야 되거나 인자 중 고유한 값이 없을 때
    const foods: Food[] = await this.prisma.food.findMany({
      where: {
        food_name,
        research_year,
        maker_name,
        food_code,
      },
    });

    // findUnique() 사용(대체 findFirst())
    // 고유한 값이 있을 때
    // const food: Food | null = await this.prisma.food.findUnique({
    //   where: {
    //     food_code,
    //   },
    // });

    if (foods.length === 0) {
      throw new NotFoundException();
    }

    return {
      result: 'ok',
      message: 'Found',
      food: foods[0],
      timestamp: DateTime.utc().toISO(),
    };
  }

  async create(foodData: CreateFoodDto): Promise<CreateFoodResponseDto> {
    const foodEntity: FoodEntity = new FoodEntity();

    // DTO to entity
    Object.assign(foodEntity, foodData);

    // 레코드 생성
    const createdFood: Food = await this.prisma.food.create({
      data: foodEntity,
    });

    return {
      result: 'ok',
      message: 'Created',
      createdId: createdFood.id,
      timestamp: DateTime.utc().toISO(),
    };
  }

  async update(
    id: number,
    foodData: UpdateFoodDto,
  ): Promise<UpdateFoodResponseDto> {
    const foodEntity: FoodEntity = new FoodEntity();

    // DTO to entity
    Object.assign(foodEntity, foodData);

    const updatedFood: Food = await this.prisma.food.update({
      where: {
        id,
      },
      data: foodEntity,
    });

    return {
      result: 'ok',
      message: 'Updated',
      updatedId: updatedFood.id,
      timestamp: DateTime.utc().toISO(),
    };
  }

  async remove(id: number): Promise<BaseResponseDto> {
    // 데이터 삭제 후 대상 객체를 반환하지만 연계할 로직이 없어 변수에 할당하지 않음
    await this.prisma.food.delete({
      where: { id },
    });

    return {
      result: 'ok',
      message: 'Removed',
      timestamp: DateTime.utc().toISO(),
    };
  }
}
