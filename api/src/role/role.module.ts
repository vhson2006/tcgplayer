import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from 'src/role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nService } from 'src/globals/i18n/i18n.service';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, RolePermission, Employee])
  ],
  controllers: [RoleController],
  providers: [RoleService, I18nService],
})
export class RoleModule {}
