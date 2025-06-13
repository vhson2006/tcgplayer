
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {  Module } from '@nestjs/common';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'html', 'build'),
      renderPath: '*',
        serveRoot: '',
        exclude: [],
    }),
  ],

})
export class AppModule {}
