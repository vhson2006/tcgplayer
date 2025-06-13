import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { I18nService } from 'src/globals/i18n/i18n.service';
import { EmployeeStatus } from './entities/employee-status.entity';
import { AuthorizationService } from 'src/iam/authorization/authorization.service';
import { Avatar } from './entities/avatar.entity';
import { Role } from 'src/role/entities/role.entity';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { MediaStatus } from 'src/media/entities/media-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Role, EmployeeStatus, Avatar, MediaStatus])
  ],
  controllers: [EmployeeController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    EmployeeService, 
    I18nService, 
    AuthorizationService
  ],
})
export class EmployeeModule {}
