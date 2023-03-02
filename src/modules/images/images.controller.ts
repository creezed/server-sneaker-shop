import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { instanceToPlain } from 'class-transformer';
import { DeleteImageDto } from '@/modules/images/dto/deleteImageDto';
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
    return instanceToPlain(this.imageService.uploadOptimizedImage(file));
  }

  @Delete()
  async deleteImage(@Body() deleteImageDto: DeleteImageDto) {
    return instanceToPlain(this.imageService.removeImage(deleteImageDto.path));
  }
}
