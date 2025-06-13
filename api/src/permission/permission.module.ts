import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Permission } from 'src/role/entities/permission.entity';
import { I18nService } from 'src/globals/i18n/i18n.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Permission])
  ],
  controllers: [PermissionController],
  providers: [PermissionService, I18nService],
})
export class PermissionModule {}
