import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { imageSize } from '@/modules/images/const/size.const';
import { ImagesResponse } from '@/modules/images/types/imagesResponse.type';

@Injectable()
export class ImagesService {
  async uploadOptimizedImage(image: Express.Multer.File) {
    const filename = uuidv4();
    const result: ImagesResponse = {
      originalName: image.originalname,
    };

    for (const item of Object.entries(imageSize) as Entries<typeof imageSize>) {
      const key = item[0];
      const value = item[1];
      const path = `${filename}-${value}x${value}.webp`;

      await sharp(image.buffer)
        .resize(value)
        .webp({ effort: 3, quality: 90 })
        .toFile(join('uploads', path));

      result[key] = '/uploads/' + path;
    }

    return result;
  }

  async removeImage(path: string) {
    console.log(path);
  }
}
