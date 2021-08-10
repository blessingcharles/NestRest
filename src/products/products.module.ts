import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { ProductsController } from "./products.controller";
import { Product, ProductSchema } from "./products.model";
import { ProductsService } from "./products.service";

@Module({
    imports : [
        MongooseModule.forFeatureAsync([
            {
                name : Product.name,
                useFactory : ()=>{
                    const schema = ProductSchema
                    
                    
                    schema.pre<Product>('save',async function (){
                        const product = this 
                        if(product.isNew){
                            console.log("middleware hook called")
                            product.createdAt = "summer product"
                        }
                    })


                }
            }
        ])
    ],
    controllers:[ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})

export class ProductsModule {

}