import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponse } from './interfaces/paginated-response.interface';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly orderItemService: OrderItemService
  ) { }

  private transformProduct(product: Product) {
    return {
      ...product,
      price: Number(product.price),
      rating: Number(product['rating'] || 0),
      sold: Number(product['sold'] || 0)
    };
  }

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse> {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productsRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.ratings', 'ratings');

    // Add search filter if search term is provided
    if (search && search.trim() !== '') {
      queryBuilder.where(
        'LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
        { search: `%${search}%` }
      );
    }

    const [products, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Add the average rating and sold count to each product
    for (const product of products) {
      const sumOfRatings = product.ratings.reduce((sum, rating) => sum + Number(rating.rating), 0);
      product['rating'] = product.ratings.length > 0 ? sumOfRatings / product.ratings.length : 0;
      
      // Get sold count from order items
      const orderItems = await this.orderItemService.findByProductId(product.id);
      product['sold'] = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    return {
      data: products.map(this.transformProduct),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.productsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
        // Find the product by ID
        const product = await this.productsRepository.findOne({ where: { id } });

        if (!product) {
          // If product is not found, throw an exception
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
    
        // Optional: Validate data (e.g., ensure price is positive)
        if (updateProductDto.price && updateProductDto.price <= 0) {
          throw new BadRequestException('Price must be a positive number');
        }
    
        // Update product fields
        Object.assign(product, updateProductDto);
    
        // Save the updated product to the database
        await this.productsRepository.save(product);
    
        return product; // Return the updated product
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }

  async findTopRated(limit: number = 3): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: ['ratings'],
    });

    // Add the average rating and sold count to each product
    for (const product of products) {
      const sumOfRatings = product.ratings.reduce((sum, rating) => sum + Number(rating.rating), 0);
      product['rating'] = product.ratings.length > 0 ? sumOfRatings / product.ratings.length : 0;
      
      // Get sold count from order items
      const orderItems = await this.orderItemService.findByProductId(product.id);
      product['sold'] = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    return products
      .map(this.transformProduct)
      .sort((a, b) => (b['rating'] as number) - (a['rating'] as number))
      .slice(0, limit);
  }
}
