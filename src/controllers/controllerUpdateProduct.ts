import {Request, Response} from 'express';
import { serviceProduct} from '../service/serviceProduct'
import { ControllerModelInterface, ServiceProductInterface} from '../models'

class UpdateProductControllers implements ControllerModelInterface {
  public path = "product";
  readonly service: ServiceProductInterface;

  constructor(service: ServiceProductInterface) {
    this.service = service;
  }

  Handler = async (req: Request, res: Response): Promise<void> => {

    const { name, price, description } = req.body;

    try {
      const value = await this.service.updateProduct(req.params.id, { name, price, description });
      res.status(204).json();
    } catch (error: any) {
      res.status(503).json(error);
    }
  };
}

export const updateProductControllers = new UpdateProductControllers(serviceProduct);