import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RatingService } from 'src/rating/rating.service';
import { UserService } from 'src/user/user.service';
import { Rating } from 'src/rating/entities/rating.entity';
import { JwtAuthGuard } from 'src/auth/utils/JwtAuthGuard';
import { PaginationDto } from './dto/pagination.dto';

@Controller('api/v1/products')
@UseGuards(JwtAuthGuard)
export class ProductController {

  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private readonly userService: UserService
  ) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get('top-rated')
  findTopRated(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit) : 3;
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return this.productService.findTopRated(3);
    }
    return this.productService.findTopRated(parsedLimit);
  }

  @Post(':id/rate/:rate')
  async rateProduct(@Param('id') id: string, @Param('rate') rate: string) {

    const product = await this.productService.findOne(+id);
    const user = await this.userService.findOne(1);

    if (!product || !user) {
      throw new Error('Product or User not found');
    }

    // Create a new Rating instance
    const rating = new Rating();
    rating.product = product;
    rating.user = user;
    rating.rating = +rate;

    // Save the new rating
    return this.ratingService.create(rating);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
