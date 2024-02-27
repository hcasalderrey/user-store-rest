import { Router } from 'express'; 
import { ProductsController } from './controller';
import { AuthMiddleware } from '../middlewares';
 




export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();

    //const productService = new ProductsService()

    const controller = new ProductsController()
    
    // Definir las rutas
     router.get('/',  controller.getProducts);
     router.post('/',[AuthMiddleware.validateJWT],controller.createProduct);




    return router;
  }


}

