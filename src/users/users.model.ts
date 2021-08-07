import * as mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    bookedProducts:[{
        type:mongoose.Types.ObjectId ,
        ref:'Products'
    }]

})

export interface User{
    id:String
    username:String
    password:String
    role:string
    bookedProducts:String[]
}