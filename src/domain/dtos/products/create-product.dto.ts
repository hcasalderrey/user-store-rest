import { Validators } from "../../../config";

export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly description: string,
        public readonly price: number,
        public readonly user: string, ///ID usuario
        public readonly category: string, ///ID categpory
    ) {}

    static create ( props: {[key:string]:any}) : [ string?, CreateProductDto?] {
      const {
        name,
        available,
        description,
        price,
        user,
        category,
      } = props;

      if(!name) return ['Missing name'];

      if(!user) return ['Missing user'];
      if(!Validators.isMongoID(user)) return ['Invalid user ID'];
      
      if(!category) return ['Missing category'];
      if(!Validators.isMongoID(category)) return ['Invalid category ID'];


      return [undefined, new CreateProductDto(
        name,
        !!available,
        description,
        price,
        user,
        category,
      )]

    }
    
}
