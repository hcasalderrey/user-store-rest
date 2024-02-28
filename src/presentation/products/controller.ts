import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { Response,Request } from "express"; 
import { ProductService } from '../services/product.service';



export class ProductsController {

    constructor(
        private readonly productService: ProductService,
    ){}


    private handleError = (error: unknown, res: Response)=>{
        if(error instanceof CustomError){
           return  res.status(error.StatusCode).json({error: error.message});
        }
        console.log(`${error}`)
        return res.status(500).json({error: 'Internal server error'});
    }
     
    createProduct =  (req: Request, res: Response ) =>{
        const [error, createProductDto] = CreateProductDto.create({
            ...req.body,
            user: req.body.user.id,
        })
        if(error)  return res.status(400).json({error})
        
        this.productService.createProduct(createProductDto! )
           .then(product=> res.status(201).json(product))
           .catch((error)=> this.handleError(error,res))

      

         
    }

    getProducts =  (req: Request, res: Response ) =>{
      
        const {page=1, limit=10} = req.query

        const [error, pagination] = PaginationDto.create(+page, +limit)

        if(error)  return res.status(400).json({error})
 
 
        this.productService.getProducts(pagination! )
           .then(products=> res.status(201).json(products))
           .catch(error=> this.handleError(error,res)) 

    }


}