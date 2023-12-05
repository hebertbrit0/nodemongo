import e, {Request, Response} from 'express';
import { serviceProduct} from '../service/serviceProduct'
import { ControllerModelInterface, ServiceProductInterface} from '../models'


export class GetProductControllers implements ControllerModelInterface {
  public path = "product";
  readonly service: ServiceProductInterface;

  constructor(service: ServiceProductInterface) {
    this.service = service;
  }

  Handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const value = await this.service.getProducts();
      res.status(200).json(value);
    } catch (error: any) {
      res.status(503).json(error);
    }
  };
}

export const getProductControllers = new GetProductControllers(serviceProduct);