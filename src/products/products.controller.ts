import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import {Product} from './products.model'
import {CreateProductsDto} from './dtos/create-products.dto'

@Controller('products')
export class ProductsController{
    
    constructor(
        private readonly productsService : ProductsService
    ){}

    @Post()
    async addProduct(
       @Body() body : CreateProductsDto
    ): Promise<any>{
        const productId = await this.productsService.addProducts(body.title ,
                                                             body.description , 
                                                             body.price)

        console.log(productId)
        return {"productId":productId}
    }

    @Get()
    async getAllProducts(){
        const products = await this.productsService.getAllProducts() 
        return products as Product[]
        
    }

    @Delete()
    async deleteProducts(
        @Body('productId') productId : string
    ):Promise<{}>{

        try{
            const response = await this.productsService.deleteProduct(productId)

            if(response.n){
                return {"success" : "Deleted"}
            }
            else{
                // throw new NotFoundException('could not find product')
                throw new HttpException("product not found",HttpStatus.NOT_FOUND)
            }
        }
        catch(err){
            
            throw new HttpException(
                        err.response || "something went wrong" ,
                        err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}