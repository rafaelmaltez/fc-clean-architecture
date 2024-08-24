import CreateProductUseCase from './create.product.usecase';

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe('Create product use case unit tests', () => {
  it('should create a product of type a', async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product A',
      price: 100,
      type: 'a',
    };

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should create a product of type b', async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product B',
      price: 100,
      type: 'b',
    };

    const output = await createProductUseCase.execute(input);
    console.log('output', output);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price * 2,
    });
  });

  it('should thrown an error when name is missing', async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: '',
      price: 100,
      type: 'b',
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should thrown an error when price is less than 0', async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product',
      price: -1,
      type: 'b',
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow('Price must be greater than zero');
  });

  it('should thrown an error when type is invalid', async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product',
      price: 100,
      type: 'invalidType',
    };

    await expect(createProductUseCase.execute(input)).rejects.toThrow('Product type not supported');
  });
});
