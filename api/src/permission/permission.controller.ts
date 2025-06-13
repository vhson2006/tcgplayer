import { Controller, Get, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ActiveUser } from 'src/iam/authentication/decorators/active-user.decorator';
import { CORRECT, INCORRECT } from 'src/assets/configs/app.constant';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';

@Auth(AuthType.Bearer)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(@Query() query: any) {
    const permissions = await this.permissionService.findAll(query);
    return {
      status: CORRECT,
      ...permissions
    }
  }
}
