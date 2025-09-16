export interface Food {
  id: number;
  food_code: string;
  group_name: string;
  food_name: string;
  research_year: string;
  maker_name: string;
  ref_name: string;
  serving_size: number;
  calorie: number | null;
  carbohydrate: number | null;
  protein: number | null;
  province: number | null;
  sugars: number | null;
  salt: number | null;
  cholesterol: number | null;
  saturated_fatty_acids: number | null;
  trans_fat: number | null;
  updatedAt: Date;
  createdAt: Date;
}
