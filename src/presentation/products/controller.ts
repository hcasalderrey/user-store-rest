import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { Response,Request } from "express";
//import { ProductService } from '../services';




export class ProductsController {

    constructor(
        //private readonly productService: ProductService,
    ){}


    private handleError = (error: unknown, res: Response)=>{
        if(error instanceof CustomError){
           return  res.status(error.StatusCode).json({error: error.message});
        }
        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'});
    }
     
    createProduct =  (req: Request, res: Response ) =>{
        //const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
        //if(error)  return res.status(400).json({error})
        
        // this.categoryService.createCategory(createCategoryDto!, req.body.user)
        //    .then(category=> res.status(201).json(category))
        //    .catch((error)=> this.handleError(error,res))

        return res.json('create product')

         
    }

    getProducts =  (req: Request, res: Response ) =>{
      
        const {page=1, limit=10} = req.query

        const [error, pagination] = PaginationDto.create(+page, +limit)

        if(error)  return res.status(400).json({error})

        return res.json('get products')
 
        //this.categoryService.getCategories(pagination! )
        //    .then(categories=> res.status(201).json(categories))
        //    .catch(error=> this.handleError(error,res)) 

    }


}