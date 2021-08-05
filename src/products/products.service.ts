import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { resourceLimits } from "worker_threads";
import { Product } from "./products.model";

@Injectable()
export class ProductsService{
    private products : Product[] = []

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ){}

    async addProducts(
        title : string ,
        description : string,
        price : number
    ){

        const newProduct = new this.productModel({
            title,
            description,
            price
        })

        const result = await newProduct.save()

        return result.id
    }

    getAllProducts():any{
        return this.products ;
    }

}