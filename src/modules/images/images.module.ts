import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
