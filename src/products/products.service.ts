import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { response } from "express";
import { Model } from "mongoose";
import { resourceLimits } from "worker_threads";
import { Product } from "./products.model";

@Injectable()
export class ProductsService{

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

        return result._id
    }

    async getAllProducts():Promise<any>{

        const products = await this.productModel.find()

        return [...products]
    }

    async deleteProduct(productId : string):Promise<any>{
        const response = await this.productModel.deleteOne({_id  :productId})

        console.log(response)

        return response
    }

}