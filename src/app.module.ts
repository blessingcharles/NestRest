import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv'
import { JwtAuthMiddleware } from './middlewares/jwtauth.middleware';
import { ProductsController } from './products/products.controller';

dotenv.config()
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://tester:zaqwerm321@cluster0.xb2oh.mongodb.net/nestdemo?retryWrites=true&w=majority`
    ),
    UsersModule
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void{

    consumer
    .apply(JwtAuthMiddleware)
    .forRoutes(
      {path:'users/bookProducts' , method : RequestMethod.POST}
    )

  }

}
