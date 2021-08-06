import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './users.model';
import { ProductsModule } from 'src/products/products.module';
import { ProductSchema } from 'src/products/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name : "Product" , schema:ProductSchema
      },
      {
        name : "User" , schema:userSchema
      }
    ]),
    ProductsModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})

export class UsersModule {}
