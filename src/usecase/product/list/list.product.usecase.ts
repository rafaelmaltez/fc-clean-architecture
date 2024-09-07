import ProductInterface from '../../../domain/product/entity/product.interface';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { ListProductOutputDto } from './list.product.dto';

export default class ListProductUsecase {
  private readonly repository: ProductRepositoryInterface

  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async execute(): Promise<ListProductOutputDto> {
    const products = await this.repository.findAll();
    return OutputMapper.toDto(products);
  }
}


class OutputMapper {
  static toDto(products: ProductInterface[]): ListProductOutputDto {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}
