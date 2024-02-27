export class CreateProductDto {
    constructor(
        public readonly name: string,
        public readonly available: string,
        public readonly description: string,
        public readonly price: number,
        public readonly user: string, ///ID usuario
        public readonly category: string, ///ID categpory
    ) {}

    static create ( object: {[key:string]:any}) : [ string?, CreateProductDto?] {
        const createProductDto = new CreateProductDto(object.name, object.available, object.description, object.price, object.user, object.category)
        return [undefined, createProductDto]
    }
    
}