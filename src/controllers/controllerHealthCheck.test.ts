import { Request, Response } from 'express';
import {HealthCheckController} from './controllerHealthCheck';
import exp from 'constants';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    controller = new HealthCheckController();
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should return a healthcheck object with status 200', async () => {
    await controller.Handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      uptime: expect.any(Number),
      message: 'OK',
      timestamp: expect.any(Number),
    });
  });

  

  it('should return an error object with status 503', async () => {
    const error = new Error('Something went wrong');
    res.json = jest.fn().mockImplementation(() => {
      throw error as Error;
    });

    await controller.Handler(req, res);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
  });
});