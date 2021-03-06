import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv'
import { JwtAuthMiddleware } from './middlewares/jwtauth.middleware';
import { ProductsController } from './products/products.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config()
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xb2oh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    ),
    UsersModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

// export class AppModule implements NestModule{
  // configure(consumer: MiddlewareConsumer): void{

  //   consumer
  //   .apply(JwtAuthMiddleware)
  //   .forRoutes(
  //     {path:'users/bookProducts' , method : RequestMethod.POST}
  //   )

  // }

// }
