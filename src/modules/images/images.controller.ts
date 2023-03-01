import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from '@/modules/images/images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}
  @Post('optimized')
  @UseInterceptors(FileInterceptor('image'))
  async uploadOptimizedImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.imageService.uploadOptimizedImage(file);
  }
}
