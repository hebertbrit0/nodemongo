import { Request, Response } from 'express';
import { GetProductControllers } from './controllerGetProducts';
import { ServiceProductInterface } from '../models';

describe('GetProductControllers', () => {
  let controller: GetProductControllers;
  let req: Request;
  let res: Response;
  let service: ServiceProductInterface;

  beforeEach(() => {
    service = {
      getProducts: jest.fn().mockResolvedValue(['product1', 'product2']),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      getProductByFilter: jest.fn(),
    };
    controller = new GetProductControllers(service);
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should return products with status 200', async () => {
    await controller.Handler(req, res);

    expect(service.getProducts).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(['product1', 'product2']);
  });

  it('should return an error object with status 503', async () => {
    const error = new Error('Something went wrong');
    service.getProducts = jest.fn().mockRejectedValue(error);

    await controller.Handler(req, res);

    expect(service.getProducts).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith(error);
  });
});