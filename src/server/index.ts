import express from 'express';
import {healthCheckController } from '../controllers/controllerHealthCheck'
import { routerGroup } from '../routers/v1/'
import {ServerModel} from '../models'

export class Server implements ServerModel {
    public app
    constructor() {
        this.app = express();
        this.configureCors();
        this.configureRoutes();        
    }

    public configureRoutes(): void {
        this.app.get('/healthcheck', healthCheckController.Handler);
        this.app.use(routerGroup.configureRoutesV1());
    }

    public configureCors(): void {
        this.app.use(express.json());
        this.app.set('access-control-allow-origin', '*');
        this.app.set('access-control-allow-methods', 'GET, POST, PUT');
        this.app.set('access-control-allow-headers', '*');
    }

    public start(port: any): void {
        this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        });
    }
}
