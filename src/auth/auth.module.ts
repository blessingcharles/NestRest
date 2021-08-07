import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService  } from '@nestjs/jwt';
import { AuthService } from './auth.service';


@Module({
    imports:[
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory : async (configService:ConfigService) => ({
                secret : configService.get('JWT_SECRET') , 
                signOptions : {expiresIn : configService.get('JWT_EXPIRES_IN')}
            })
        })
    ],
    providers: [AuthService],
    exports : [AuthService ]
})
export class AuthModule {}
