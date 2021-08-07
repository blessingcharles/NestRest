import { Injectable } from '@nestjs/common';
import {HttpException , HttpStatus} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService){}
    
    async generateJWT(payload : Object) : Promise <string> {
        let token
        try{
            token = this.jwtService.sign(payload)
        }
        catch(err){
           throw new HttpException("something went wrong",HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return token
    }

     // encrypt password
     async encryptPassword(password : string) : Promise<string>{

        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password,12)
        }catch(err){
           throw new HttpException("something went wrong",HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return hashedPassword
    }   

    async comparePassword(password : string , hashedpassword : string ) : Promise<any | boolean>{

        try{
            const isEqual = await bcrypt.compare(password , hashedpassword )
            return isEqual
        }
        catch(err){
           throw new HttpException("something went wrong",HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
