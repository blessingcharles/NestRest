
import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector ,
            @Inject(forwardRef(()=> UsersService))
            private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
   
    const user = request.user;
    //matchRoles
    const userDetails : User = await this.usersService.getUserDetails(user["id"])
    if(userDetails && roles.includes(userDetails.role)){
        console.log(userDetails)

        return true
    }
    return false

  }
}
