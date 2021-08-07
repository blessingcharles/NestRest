import { Body, Controller , Post, Req} from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { bookProductsDto } from './dtos/book-products.dtos';
import {CreateUsersDto} from './dtos/create-users.dtos'
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly productsService : ProductsService ,
        private readonly usersService :    UsersService ,
        private authService: AuthService
    ){}

    @Post('/login')
    async loginUser(
        @Body() body : CreateUsersDto
    ){
        const token = await this.usersService.login(body.name , body.password)
        return {
            token
        }
    }

    @Post('/signup')
    async signupUser(
        @Body() body : CreateUsersDto
    ){
        const [results , token ] = await this.usersService.signup(body.name , body.password)

        return {
            token , 
            userid : results["_id"]
        }
    }

    @Post('/bookProducts')
    async bookProducts(
        @Body() body : bookProductsDto,
        @Req() req : Request
    ){
        return {msg : await this.usersService.preBookProducts(body.productId , req.user) }
    }
    
}
