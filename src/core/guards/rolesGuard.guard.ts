import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/users/entities/role.entity';
import { Providers, Roles } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(Providers.ROLES_REPOSITORY)
    private readonly rolesRepository: typeof Role,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user);
  }

  private async matchRoles(roles: string[], user: any): Promise<boolean> {
    const userRoles: string[] = (
      await this.rolesRepository.findAll({ where: { id: user.id } })
    ).map((role) => role.name);

    if (userRoles.includes(Roles.ADMIN)) {
      return true;
    }

    return roles.every((role) => userRoles.includes(role));
  }
}
