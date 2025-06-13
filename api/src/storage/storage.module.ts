import { Module } from '@nestjs/common';
import { StorageController } from 'src/storage/storage.controller';
import { StorageService } from 'src/storage/storage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from 'src/storage/entities/storage.entity';
import { I18nService } from 'src/globals/i18n/i18n.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Storage
    ]),
  ],
  controllers: [StorageController],
  providers: [I18nService, StorageService],
})
export class StorageModule {}
