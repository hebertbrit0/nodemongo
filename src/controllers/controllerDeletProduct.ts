import {Request, Response} from 'express';
import { serviceProduct} from '../service/serviceProduct'
import { ControllerModelInterface, ServiceProductInterface} from '../models'

class DeleteProduct implements ControllerModelInterface {
  public path = "product";
  readonly service: ServiceProductInterface;

  constructor(service: ServiceProductInterface) {
    this.service = service;
  }

  Handler = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.deleteProduct(req.params.id);
      res.status(204).json();
    } catch (error: any) {
      res.status(503).json(error);
    }
  };
}

export const deleteProductController = new DeleteProduct(serviceProduct);