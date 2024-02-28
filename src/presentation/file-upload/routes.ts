import { Router } from 'express';   
import { FileUploadController } from './controller';
import { FileUploadService } from '../services';
import { FileUploadMiddleware, TypeMiddleware } from '../middlewares/';




export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(
      new FileUploadService()
    );
    

    router.use(FileUploadMiddleware.containFiles)
    router.use(TypeMiddleware.validTypes(['users', 'categories','products']))



    
    // Definir las rutas
    router.post( '/single/:type', controller.uploadFile );
    router.post( '/multiple/:type',controller.uploadMultipleFiles );




    return router;
  }


}

