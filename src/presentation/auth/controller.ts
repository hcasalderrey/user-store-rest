import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services"; 

export class   AuthController {
    
    constructor(
        public readonly authservice: AuthService,
    ) {}

    private handleError = (error: unknown, res: Response)=>{
        if(error instanceof CustomError){
           return  res.status(error.StatusCode).json({error: error.message});
        }
        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'});
    }
     
    registerUser = (req:Request, res: Response) => {

        const [error,registerDto] = RegisterUserDto.create(req.body);

        if(error) return res.status(400).json({error});

       this.authservice.registerUser(registerDto!)
        .then((user)=> res.json({user}))
        .catch((error)=> this.handleError(error,res))
    } 

    loginUser = (req:Request, res: Response) => {
        const [error,loginUserDto] = LoginUserDto.login(req.body);

        if(error) return res.status(400).json({error});

       this.authservice.loginUser(loginUserDto!)
        .then((user)=> res.json({user}))
        .catch((error)=> this.handleError(error,res))
    } 
    ValidateEmail = (req:Request, res: Response) => {
        const {token} = req.params
        this.authservice.validateEmail(token)
        .then(()=> res.json('This email is valid'))
        .catch((error)=> this.handleError(error,res))
        //res.json(token);	
    } 

}