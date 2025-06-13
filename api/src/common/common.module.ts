import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Common } from 'src/common/entities/common.entity';
import { I18nService } from 'src/globals/i18n/i18n.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Common])
  ],
  controllers: [CommonController],
  providers: [CommonService, I18nService],
})
export class CommonModule {}
