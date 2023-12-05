import {Request, Response} from 'express';
import { serviceProduct} from '../service/serviceProduct'
import { ControllerModelInterface, ServiceProductInterface} from '../models'

interface GreaterThanInterface {
    property: string;
    value: number;
}

class GetProductByFilterController implements ControllerModelInterface {
  public path = "product";
  readonly service: ServiceProductInterface;

  constructor(service: ServiceProductInterface) {
    this.service = service;
  }

  Handler = async (req: Request, res: Response): Promise<void> => {

    const {name, description, price, gtValues} = req.query;
    
    try {
        const value = await this.service.getProductByFilter({name, description, price, gtValues});
        res.status(200).json(value);
    } catch (error: any) {
        res.status(503).json(error);
    }
  };
}

export const getProductByFilterController = new GetProductByFilterController(serviceProduct);