import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInventory } from '@/entities/product-inventory.entity';
import { ProductService } from '@/modules/product/services/product.service';

@Injectable()
export class ProductInventoryService {
  constructor(
    @InjectRepository(ProductInventory)
    private readonly productInventoryRepository: Repository<ProductInventory>,
    private readonly productService: ProductService,
  ) {}

  getAll() {
    return this.productInventoryRepository.find({ relations: { size: true } });
  }

  findByProductAndSize(productId: number, sizeId: number) {
    return this.productInventoryRepository.findOneBy({
      product: { id: productId },
      size: { id: sizeId },
    });
  }
  async addProduct(productId: number, sizeId: number, quantity: number) {
    const isExist = await this.findByProductAndSize(productId, sizeId);

    if (isExist) {
      throw new BadRequestException('Товар с таким размером уже есть в списке');
    }

    const product = await this.validateProductInventory(productId, sizeId);

    await this.productInventoryRepository.insert({
      product,
      size: { id: sizeId },
      quantity,
    });
  }

  async removeProduct(productId: number, sizeId: number) {
    const isExist = await this.findByProductAndSize(productId, sizeId);

    if (!isExist) {
      throw new BadRequestException('Товара с таким размером нету в списке');
    }

    const product = await this.validateProductInventory(productId, sizeId);

    return this.productInventoryRepository.delete({
      product,
      size: { id: sizeId },
    });
  }

  async updateQuantity(productId: number, sizeId: number, newQuantity: number) {
    const isExist = await this.findByProductAndSize(productId, sizeId);

    if (!isExist) {
      throw new BadRequestException('Товара с таким размером нету в списке');
    }

    const product = await this.validateProductInventory(productId, sizeId);

    await this.productInventoryRepository.update(
      {
        product,
        size: { id: sizeId },
      },
      { quantity: newQuantity },
    );
  }

  async validateProductInventory(productId: number, sizeId: number) {
    const product = await this.productService.validateProduct(productId, {
      brand: { sizes: true },
    });

    const hasSize = await this.productService.checkProductWithBrandSize(
      product,
      sizeId,
    );

    if (!hasSize) {
      throw new NotFoundException(
        'Этого размера нету в размерной сетке бренда',
      );
    }

    return product;
  }
}
