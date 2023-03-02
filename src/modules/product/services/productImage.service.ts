import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImages } from '@/entities/product-images.entity';
import { ImagesService } from '@/modules/images/images.service';
import { ProductService } from '@/modules/product/services/product.service';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImages)
    private readonly productImagesRepository: Repository<ProductImages>,
    private readonly imageService: ImagesService,
    private readonly productService: ProductService,
  ) {}

  async create(image: Express.Multer.File, productId: number) {
    const product = await this.productService.validateProduct(productId);

    const img = await this.imageService.uploadOptimizedImage(image);

    const response = this.productImagesRepository.create({
      product,
      small: img.small,
      medium: img.medium,
      large: img.large,
      extraLarge: img.extraLarge,
    });

    await this.productImagesRepository.save(response);

    return response;
  }

  async update(image: Express.Multer.File, imgId: number, productId: number) {
    await this.productService.validateProduct(productId);

    const oldImg = await this.productImagesRepository.findOneBy({ id: imgId });

    if (!oldImg) {
      throw new NotFoundException('Прошлая картинка не обнаружена');
    }

    await this.imageService.removeImage(oldImg.small);

    const newImg = await this.imageService.uploadOptimizedImage(image);

    await this.productImagesRepository.update(oldImg.id, {
      small: newImg.small,
      medium: newImg.medium,
      large: newImg.large,
      extraLarge: newImg.extraLarge,
    });

    return newImg;
  }

  async delete(productId: number, imgId: number) {
    const product = await this.productService.validateProduct(productId, {
      images: true,
    });

    const img = product.images.find(img => img.id === imgId);

    if (!img) {
      throw new NotFoundException('Картинка не обнаружена');
    }

    await this.imageService.removeImage(img.small);

    await this.productImagesRepository.delete(imgId);
  }
}
