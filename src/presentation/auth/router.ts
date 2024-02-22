import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const authservice = new AuthService

    const controller = new AuthController(authservice)
    
    // Definir las rutas
     router.post('/login', controller.loginUser );
     router.post('/register', controller.registerUser );

     router.get('/validate-email/:token',controller.ValidateEmail );




    return router;
  }


}

