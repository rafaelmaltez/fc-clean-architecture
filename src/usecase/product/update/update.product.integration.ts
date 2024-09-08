import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import UpdateProductUsecase from './update.product.usecase'

describe("Update product usecase integration test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      sync: { force: true }
    })
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("Should update a product", async () => {
    const product1 = ProductFactory.create("a", "Product 01", 100);
    const productRepository = new ProductRepository();
    await productRepository.create(product1);

    const updateProductUsecase = new UpdateProductUsecase(productRepository);

    const input = {
      id: product1.id,
      name: "Updated Product",
      price: 200
    }

    const output = await updateProductUsecase.execute(input);
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.price).toBe(input.price);

    const updated = await productRepository.find(product1.id)
    expect(updated.name).toBe(input.name)
    expect(updated.price).toBe(input.price);
  })
})