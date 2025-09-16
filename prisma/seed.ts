import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { readFile, utils } from 'xlsx';

// interface 정의
interface FoodData {
  food_code: string;
  group_name: string;
  food_name: string;
  research_year: string;
  maker_name: string;
  ref_name: string;
  serving_size: string;
  calorie: string;
  carbohydrate: string;
  protein: string;
  province: string;
  sugars: string;
  salt: string;
  cholesterol: string;
  saturated_fatty_acids: string;
  trans_fat: string;
}

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // 헬퍼 함수
  // 수치 값에 "-" 포함된 필드 정규화
  const normalize: (value: string) => number | null = (
    value: string,
  ): number | null => {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === 'string' && value.trim() === '-') {
      return null;
    }

    return Number(value);
  };

  // 엑셀 파일 읽기
  const workbook = readFile(
    path.join(process.cwd(), 'data/dummy_20230715.xlsx'),
  );
  const sheetName: string = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // sheet를 JSON 형태로 변환
  const data: FoodData[] = utils.sheet_to_json<FoodData>(worksheet);

  await prisma.food.deleteMany({});

  for (const row of data) {
    // seed 데이터 삽입
    await prisma.food.create({
      data: {
        food_code: row.food_code,
        group_name: row.group_name,
        food_name: row.food_name,
        research_year: row.research_year,
        maker_name: row.maker_name,
        ref_name: row.ref_name,
        serving_size: Number(row.serving_size),
        calorie: normalize(row.calorie),
        carbohydrate: normalize(row.carbohydrate),
        protein: normalize(row.protein),
        province: normalize(row.province),
        sugars: normalize(row.sugars),
        salt: normalize(row.salt),
        cholesterol: normalize(row.cholesterol),
        saturated_fatty_acids: normalize(row.saturated_fatty_acids),
        trans_fat: normalize(row.trans_fat),
      },
    });
  }
}

main()
  .then(async (): Promise<void> => {
    await prisma.$disconnect();
  })
  .catch(async (e): Promise<never> => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
