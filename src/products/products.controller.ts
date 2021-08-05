import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    
    constructor(
        private readonly productsService : ProductsService
    ){}

    @Post()
    addProduct(
        @Body('title') title: string ,
        @Body('description') description: string,
        @Body('price') price: number
    ): any{
        const productId = this.productsService.addProducts(title , description , price)

        return {productId}
    }

    @Get()
    getAllProducts():any{
        return { 
            products : this.productsService.getAllProducts() 
        }
    }
}