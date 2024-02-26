import { CreateCategoryDto, CustomError } from "../../domain";
import { Response,Request } from "express";




export class CategoryController {

    constructor(){}


    private handleError = (error: unknown, res: Response)=>{
        if(error instanceof CustomError){
           return  res.status(error.StatusCode).json({error: error.message});
        }
        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'});
    }
     
    createCategory = async (req: Request, res: Response ) =>{
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
        if(error)  return res.status(400).json({error})
        
        
        return res.json(createCategoryDto)
    }

    getCategory = async (req: Request, res: Response ) =>{
        res.json('Get Categories')
    }


}