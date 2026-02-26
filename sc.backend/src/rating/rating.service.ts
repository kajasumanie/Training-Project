import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RatingService {

  constructor(@InjectRepository(Rating) private ratingsRepository: Repository<Rating>) { }

  create(createRatingDto: CreateRatingDto) {
    this.ratingsRepository.create(createRatingDto);
    return this.ratingsRepository.save(createRatingDto);
  }

  findAllByProductId(productId: number) {
    return this.ratingsRepository.find({ where: { product: { id: productId } } })
  }

}
