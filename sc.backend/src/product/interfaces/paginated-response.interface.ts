import { Product } from '../entities/product.entity';

export interface PaginatedResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 