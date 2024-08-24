import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import CreateProductUseCase from './create.product.usecase'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'

describe('Create product use case integration tests', () => {
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

  it("Should create a product of type A", async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    const input = {
      name: 'Product A',
      price: 100,
      type: 'a'
    }

    const output = await usecase.execute(input)

    expect(output.id).toBeDefined()
    expect(output.name).toEqual(input.name)
    expect(output.price).toEqual(input.price)

  })

  it("Should create a product of type B", async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    const input = {
      name: 'Product B',
      price: 100,
      type: 'b'
    }

    const output = await usecase.execute(input)

    expect(output.id).toBeDefined()
    expect(output.name).toEqual(input.name)
    expect(output.price).toEqual(input.price * 2)

  })

  it('Shoul throw an error when name is missing', async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    const input = {
      name: '',
      price: 100,
      type: 'b'
    }
    expect(usecase.execute(input)).rejects.toThrow("Name is required")
  })

  it('Shoul throw an error when price is less than 0', async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    const input = {
      name: 'Product',
      price: -15,
      type: 'b'
    }
    expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero")
  })


})