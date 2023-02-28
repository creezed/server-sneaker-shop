import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesResponse } from '@/modules/images/types/imagesResponse.type';
import { generateFileName } from '@/modules/images/utils/generateFileName.util';
import { imageFileFilter } from '@/modules/images/utils/imagesFilter.util';

@Controller('images')
export class ImagesController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: generateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ImagesResponse> {
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    };
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 6, {
      storage: diskStorage({
        destination: './uploads',
        filename: generateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response: ImagesResponse[] = [];

    files.forEach(file => {
      const fileResponse: ImagesResponse = {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
      };
      response.push(fileResponse);
    });
    return response;
  }
}
