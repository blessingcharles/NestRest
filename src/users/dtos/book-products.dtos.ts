import { IsString } from "class-validator";

export class bookProductsDto {
    
    @IsString()
    productId : string

}