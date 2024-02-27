export class PaginationDto {
    constructor(
        public readonly limit: number,
        public readonly page: number,
    ) {}

    static create (page: number = 1, limit: number = 10) : [string?, PaginationDto?] {
        
        if(isNaN(page) || isNaN(limit)) return ['Page and Limit must be numbers']
        if(page <= 0 || limit <= 0) return ['Invalid pagination']
        return [undefined, new PaginationDto(limit, page)]
        
    }
}