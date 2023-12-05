import express, { Router } from 'express';
import { ServiceProduct, serviceProduct } from '../../service/serviceProduct';

import { ControllerProduct } from '../../controllers/controllerProduct';
import { getProductControllers } from '../../controllers/controllerGetProducts';
import { updateProductControllers } from '../../controllers/controllerUpdateProduct';
import { deleteProductController } from '../../controllers/controllerDeletProduct';
import { getProductByFilterController } from '../../controllers/controllerGetFilterByProduct';

interface RouterGroupInterface {
    configureRoutesV1(): Router;
}

class RouterGroup implements RouterGroupInterface {

    public configureRoutesV1(): Router {
        const v1 = express.Router();

        const controllerProduct = new ControllerProduct(serviceProduct);

        v1.post('/api/v1/product', controllerProduct.Handler);
        v1.get('/api/v1/products', getProductControllers.Handler);
        v1.put('/api/v1/product/:id', updateProductControllers.Handler);
        v1.delete('/api/v1/product/:id', deleteProductController.Handler);
        v1.get('/api/v1/product/filters', getProductByFilterController.Handler);

        return v1;
    }
    
}

export const routerGroup = new RouterGroup();