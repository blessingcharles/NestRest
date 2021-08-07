import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from './users.model';
import { Product } from 'src/products/products.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Product') private readonly productModel: Model<Product>,
        private authService: AuthService

    ){}

    async login(
        username:string ,
        password:string ,
    ){
        let identifyUser 
        
        try {
            //checking username
            identifyUser = await this.userModel.findOne({username})
            if(!identifyUser){
                throw new HttpException("invalid credentials",HttpStatus.UNAUTHORIZED)
            }
            console.log(identifyUser)
            
            if(await this.authService.comparePassword(password , identifyUser.password)){
                const token =await this.authService.generateJWT({id : identifyUser._id})
                return token
            }
            else{
                throw new HttpException("invalid credentials",HttpStatus.UNAUTHORIZED)
            }
        }
        catch(err){
            throw new HttpException(err.response || "something went wrong" , 
                                    err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    async signup(
        username:string ,
        password:string
    ){
        let identifyUser 
        
        try {
            //checking if username already exists
            identifyUser = await this.userModel.findOne({username})
        
            if(identifyUser){
                throw new HttpException("username already taken",400)
            }

            password = await this.authService.encryptPassword(password)
            const user = new this.userModel({
                username,
                password ,
                bookedProducts:[]
            })

            const results = await user.save()

            const token = await this.authService.generateJWT({id:results._id})

            return [results , token]

        }
        catch(err){
            // console.log(err)
            throw new HttpException(err.response || "something went wrong",
                                    err.status || HttpStatus.INTERNAL_SERVER_ERROR)
         }

    }

    async preBookProducts(productId : string , user : {}) : Promise<String>{
        try{
            const isProductExist = await this.productModel.findById({_id:productId})
            
            if(!isProductExist){
               throw new HttpException("product doesnot exists",HttpStatus.NOT_FOUND)
            }
            
            const identifyUser = await this.userModel.findById({_id:user["id"]})
            if(identifyUser){
                identifyUser.bookedProducts.push(productId)
                await identifyUser.save()
                return "successfully booked " + isProductExist.title
            }
            else{
               throw new HttpException("can't find user",HttpStatus.NOT_FOUND)
            }
        }
        catch(err){
           throw new HttpException(err.response || "something went wrong",
                                    err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // // encrypt password
    // async encryptPassword(password : string) : Promise<string>{

    //     let hashedPassword
    //     try{
    //         hashedPassword = await bcrypt.hash(password,12)
    //     }catch(err){
    //        throw new HttpException("something went wrong",HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    //     return hashedPassword
    // }   

    // // generate jwt token
    // async generateJWT(payload : Object){

    //     let token
    //     try{
    //         token = jwt.sign(payload,'secretkey',{expiresIn:'90d'})
    //     }
    //     catch(err){
    //        throw new HttpException("something went wrong",HttpStatus.INTERNAL_SERVER_ERROR)
    //     }

    //     return token
    // }

    // async comparePassword(hashedPassword , password) : Promise<boolean> {
    //     const isEqual = await bcrypt.compare(hashedPassword , password)

    //     return isEqual
    // }

}
