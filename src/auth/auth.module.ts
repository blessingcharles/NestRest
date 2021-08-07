import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService  } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt-strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles-guard';


@Module({
    imports:[
        forwardRef(()=> UsersModule),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory : async (configService:ConfigService) => ({
                secret : configService.get('JWT_SECRET') , 
                signOptions : {expiresIn : configService.get('JWT_EXPIRES_IN')}
            })
        })
    ],
    providers: [AuthService , RolesGuard , JwtAuthGuard  , JwtStrategy],
    exports : [AuthService ]
})
export class AuthModule {}
