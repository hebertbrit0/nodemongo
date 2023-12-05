import { ServiceProduct } from './serviceProduct';
import { ProductRepositoryInterface } from '../models';
import { ProductRepositoryModel } from '../models/repoModels/productModel';
describe('ServiceProduct', () => {
  let service: ServiceProduct;
  let productRepository: ProductRepositoryInterface;

  beforeEach(() => {
    productRepository = {
      createProduct: jest.fn(),
      getProducts: jest.fn(),
      getProductById: jest.fn(), // Add this line
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    };
    service = new ServiceProduct(productRepository);
  });

  describe('createProduct', () => {
    it('should call productRepository.createProduct and return the id of the created product', async () => {
      const product = { name: 'Product 1', description: 'Description 1', price: 10 };
      const idProduct = '123';

      (productRepository.createProduct as jest.Mock).mockResolvedValue(idProduct);

      const result = await service.createProduct(product);

      expect(productRepository.createProduct).toHaveBeenCalledWith(product);
      expect(result).toBe(idProduct);
    });
  });

  describe('getProducts', () => {
    it('should call productRepository.getProducts and return the list of products', async () => {
      const products: ProductRepositoryModel[] = [
        {name: 'Product 1', description: 'Description 1', price: 10 },
        {name: 'Product 2', description: 'Description 2', price: 20 },
      ];

      (productRepository.getProducts as jest.Mock).mockResolvedValue(products);

      const result = await service.getProducts();

      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual(products);
    });

    it('should return an empty array if productRepository.getProducts returns undefined', async () => {
      (productRepository.getProducts as jest.Mock).mockResolvedValue(undefined);

      const result = await service.getProducts();

      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('updateProduct', () => {
    it('should call productRepository.updateProduct and return the updated product', async () => {
      const id = '1';
      const product: ProductRepositoryModel = {name: 'Product 1', description: 'Description 1', price: 10 };

      (productRepository.updateProduct as jest.Mock).mockResolvedValue(product);

      const result = await service.updateProduct(id, product);

      expect(productRepository.updateProduct).toHaveBeenCalledWith(id, product);
      expect(result).toEqual(product);
    });

    it('should return an empty object if productRepository.updateProduct returns undefined', async () => {
      const id = '1';
      const product: ProductRepositoryModel = {name: 'Product 1', description: 'Description 1', price: 10 };

      (productRepository.updateProduct as jest.Mock).mockResolvedValue(undefined);

      const result = await service.updateProduct(id, product);

      expect(productRepository.updateProduct).toHaveBeenCalledWith(id, product);
      expect(result).toEqual({});
    });
  });

  describe('deleteProduct', () => {
    it('should call productRepository.deleteProduct', async () => {
      const id = '1';

      await service.deleteProduct(id);

      expect(productRepository.deleteProduct).toHaveBeenCalledWith(id);
    });
  });

  describe('getProductByFilter', () => {
    it('should call productRepository.getProducts and return the filtered and sorted products', async () => {
      const products: ProductRepositoryModel[] = [
        {name: 'Product 1', description: 'Description 1', price: 10 },
        {name: 'Product 2', description: 'Description 2', price: 20 },
        {name: 'Product 3', description: 'Description 3', price: 30 },
      ];
      const filter = { name: 'Product', price: 20, gtValues: '[{"property": "price", "value": 15}]' };
      const filteredProducts: ProductRepositoryModel[] = [
        {name: 'Product 2', description: 'Description 2', price: 20 },
        {name: 'Product 3', description: 'Description 3', price: 30 },
      ];

      (productRepository.getProducts as jest.Mock).mockResolvedValue(products);

      const result = await service.getProductByFilter(filter);

      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual(filteredProducts);
    });

    it('should return an empty array if productRepository.getProducts returns undefined', async () => {
      const filter = { name: 'Product', price: 20, gtValues: '[{"property": "price", "value": 15}]' };

      (productRepository.getProducts as jest.Mock).mockResolvedValue(undefined);

      const result = await service.getProductByFilter(filter);

      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should return the unfiltered products if filter.gtValues is undefined', async () => {
      const products: ProductRepositoryModel[] = [
        {name: 'Product 1', description: 'Description 1', price: 10 },
        {name: 'Product 2', description: 'Description 2', price: 20 },
        {name: 'Product 3', description: 'Description 3', price: 30 },
      ];
      const filter = { name: 'Product', price: 20 };

      (productRepository.getProducts as jest.Mock).mockResolvedValue(products);

      const result = await service.getProductByFilter(filter);

      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual(products);
    });

    it('should return the unfiltered products if filter.gtValues is an empty array', async () => {
      const products: ProductRepositoryModel[] = [
        {name: 'Product 1', description: 'Description 1', price: 10 },
        {name: 'Product 2', description: 'Description 2', price: 20 },
        {name: 'Product 3', description: 'Description 3', price: 30 },
      ];
      const filter = { name: 'Product', price: 20, gtValues: '[]' };

      (productRepository.getProducts as jest.Mock).mockResolvedValue(products);

      const result = await service.getProductByFilter(filter);

      expect(productRepository.getProducts).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });
});