import { Router } from 'express';
import { AuthRoutes } from './auth/router';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
     router.use('/api/auth', AuthRoutes.routes );



    return router;
  }


}
