import {HttpException, HttpStatus, Injectable , NestMiddleware} from "@nestjs/common"
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware{

    use(req : Request , res : Response , next: ()=> void){

        const jwtToken = req.headers["authorization"]
        if(!jwtToken){
            throw new HttpException("failed in token verification",HttpStatus.UNAUTHORIZED)
        }
        try{
            const user = jwt.verify(jwtToken,"secretkey")
            if(user){
                req["user"] = user ;
            }
        }
        catch(err){
            console.log("failed in jwt middleware : " , err)
            throw new HttpException("failed in token verification",HttpStatus.UNAUTHORIZED)
        }

        next()
    }

}