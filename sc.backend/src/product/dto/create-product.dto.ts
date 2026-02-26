import { Rating } from "src/rating/entities/rating.entity";

export class CreateProductDto {
      title: string;
      description: string;
      price: number;
      imageUrl: string;
      ratings: Rating[];
}
