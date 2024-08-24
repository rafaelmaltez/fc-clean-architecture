import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe('Find prodcut usecase unit tests', () => {

  it('Should find a product', async () => {
    const productRepository = MockRepository()
    const product = new Product('1234', 'Some Product', 150)
    jest.spyOn(productRepository, 'find').mockResolvedValueOnce(product)

    const usecase = new FindProductUseCase(productRepository)
    const output = await usecase.execute({ id: '1234' })

    expect(output.id).toEqual(product.id)
    expect(output.name).toEqual(product.name)
    expect(output.price).toEqual(product.price)

  })

  it('Should throw if no product is found', async () => {
    const productRepository = MockRepository()
    jest.spyOn(productRepository, 'find').mockRejectedValueOnce(new Error("Product not found"))
    const usecase = new FindProductUseCase(productRepository)

    expect(usecase.execute({ id: '1234' })).rejects.toThrow("Product not found")
  })

})