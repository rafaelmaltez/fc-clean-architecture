import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { CreateProductInputDto, CreateProductOutputDto } from './create.product.dto';

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute(inputDto: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = ProductFactory.create(inputDto.type, inputDto.name, inputDto.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}