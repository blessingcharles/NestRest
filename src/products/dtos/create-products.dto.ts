import {IsNumber, IsOptional, IsString} from 'class-validator'

export class CreateProductsDto {
    @IsString()
    title : string 

    @IsOptional()
    @IsString()
    description : string

    @IsNumber()
    price : number
}