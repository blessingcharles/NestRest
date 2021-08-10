import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { ProductsController } from "./products.controller";
import { Product, ProductSchema } from "./products.model";
import { ProductsService } from "./products.service";

@Module({
    imports : [
        MongooseModule.forFeature([
            {
              name : "Product" , schema:ProductSchema
            },])
    ],
    controllers:[ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})

export class ProductsModule {

}