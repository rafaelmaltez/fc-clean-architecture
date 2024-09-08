import ProductFactory from '../../../domain/product/factory/product.factory';
import UpdateProductUsecase from './update.product.usecase';

const product1 = ProductFactory.create("a", "Product 01", 100);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Update product usecase unit test", () => {
  it("Should update a product", async () => {
    const input = {
      id: product1.id,
      name: "Product Updated",
      price: 150
    }

    const repository = MockRepository();
    const updateProductUsecase = new UpdateProductUsecase(repository)
    const output = await updateProductUsecase.execute(input);

    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);


  })
})