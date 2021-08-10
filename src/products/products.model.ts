import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document{
    @Prop({required : true})
    title:string

    @Prop()
    description : string

    @Prop()
    createdAt : string
}

export const ProductSchema = SchemaFactory.createForClass(Product)

// import * as mongoose from 'mongoose'

// export const ProductSchema = new mongoose.Schema({
//     title : {
//         type:String , 
//         required: true
//     },
//     description:String,
//     price : Number
// })

// export interface Product extends mongoose.Document{
    
//         id:string 
//         title : string 
//         description : string 
//         price : number

// }

