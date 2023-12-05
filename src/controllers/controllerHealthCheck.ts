import { Request, Response } from 'express';
import { ControllerModelInterface} from '../models/controllerModel'

export class HealthCheckController implements ControllerModelInterface{
    public path = "healthcheck";
    Handler = async (req: Request, res: Response): Promise<void> => {

        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        };

        try {
            res.status(200).json(healthcheck);
        } catch (error: any) {
            res.status(503).json({'error': 'error'});
        }
    }
}

export const healthCheckController = new HealthCheckController();