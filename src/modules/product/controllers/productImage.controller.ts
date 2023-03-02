import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { instanceToPlain } from 'class-transformer';
import { ProductImageService } from '@/modules/product/services/productImage.service';

@Controller('product')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Param('id') id: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return instanceToPlain(this.productImageService.create(file, +id));
  }

  @Patch(':id/image/:imageId')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return instanceToPlain(
      this.productImageService.update(file, +imageId, +id),
    );
  }

  @Delete(':id/image/:imageId')
  delete(@Param('id') productId: string, @Param('imageId') imageId: string) {
    return this.productImageService.delete(+productId, +imageId);
  }
}
