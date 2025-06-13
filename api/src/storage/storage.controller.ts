import { Body, Controller } from '@nestjs/common';
import { Storage } from 'src/storage/entities/storage.entity';
import { CORRECT } from 'src/assets/configs/app.constant';
import { EntityExistsPipe } from 'src/globals/entity-exists.pipe';
import { CreateStorageDto } from 'src/storage/dto/create-storage.dto';
import { StorageQueryDto } from 'src/storage/dto/query-storage.dto';
import { UpdateStorageDto } from 'src/storage/dto/update-storage.dto';
import { StorageService } from 'src/storage/storage.service';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  findAll(@Body() query: StorageQueryDto) {
    return this.storageService.findAll(query);
  }

  findOne(@Body('id', EntityExistsPipe(Storage)) storage: Storage) {
    return {
      status: CORRECT,
      data: storage
    }
  }

  update(
    @Body('id', EntityExistsPipe(Storage)) storage: Storage, 
    @Body() updateStorageDto:  UpdateStorageDto
  ) {
    return this.storageService.update(storage, updateStorageDto);
  }

  remove(@Body('id', EntityExistsPipe(Storage)) storage: Storage) {
    return this.storageService.remove(storage);
  }
}
