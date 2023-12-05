import {Request, Response} from 'express';
import {serviceProduct} from '../service/serviceProduct'
import { ControllerModelInterface, ServiceProductInterface} from '../models'

export class ControllerProduct implements ControllerModelInterface{
    public path = "product";
    readonly service: ServiceProductInterface;
    constructor(service: ServiceProductInterface) {
        this.service = service;
    }

    Handler = async (req: Request, res: Response): Promise<void> => {
        const {name, price, description} = req.body;
        try {
            const data = await this.service.createProduct({name, price, description});
            res.status(200).json(data);
        } catch (error: any) {
            res.status(503).json(error);
        }
    }

}

//factory
export const createControllerProduct = new ControllerProduct(serviceProduct);