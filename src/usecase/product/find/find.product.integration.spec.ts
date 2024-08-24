import { Sequelize } from 'sequelize-typescript';
import FindProductUseCase from './find.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';

describe('Find product usecase integration tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true }
    })
    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('Shoud find a product', async () => {
    await ProductModel.create({
      id: '12345',
      name: 'Some Product',
      price: 200
    })

    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input = { id: '12345' }
    const output = await usecase.execute(input)

    expect(output.id).toEqual('12345')
    expect(output.name).toEqual('Some Product')
    expect(output.price).toEqual(200)
  })

  it('Should throw if no product is found', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input = { id: '1234' }

    await expect(usecase.execute(input)).rejects.toThrow("Product not found")
  })
})