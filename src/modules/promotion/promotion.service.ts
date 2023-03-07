import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { ProductInPromotion } from '@/entities/product-in-promotion.entity';
import { Product } from '@/entities/product.entity';
import { Promotion } from '@/entities/promotion.entity';
import { ProductService } from '@/modules/product/services/product.service';
import { AddProductDto } from '@/modules/promotion/dto/add-product.dto';
import { CreatePromotionDto } from '@/modules/promotion/dto/create-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(ProductInPromotion)
    private readonly productInPromotionRepository: Repository<ProductInPromotion>,
    private readonly productService: ProductService,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    const promotion = this.promotionRepository.create(createPromotionDto);
    await this.promotionRepository.save(promotion);
    return promotion;
  }

  async addProduct(
    id: number,
    productId: number,
    addProductDto: AddProductDto,
  ) {
    const promotion = await this.validatePromotion(id, {
      products: { product: true },
    });

    const product = await this.productService.validateProduct(productId, {
      promotion: true,
    });

    const productHasPromotion = product?.promotion;

    if (productHasPromotion) {
      throw new BadRequestException('Этот продукт уже имеет скидку');
    }

    const promotionHasProduct = this.checkProductInPromotion(
      product,
      promotion,
    );

    if (promotionHasProduct) {
      throw new BadRequestException('Этот продукт уже есть в этой акции');
    }

    const productInPromotion = this.productInPromotionRepository.create({
      promotion,
      product,
      ...addProductDto,
    });

    await this.productInPromotionRepository.insert(productInPromotion);

    return HttpStatus.CREATED;
  }

  async removeProduct(id: number, productId: number) {
    const promotion = await this.validatePromotion(id, {
      products: { product: true },
    });

    const product = await this.productService.validateProduct(productId, {
      promotion: true,
    });

    const productHasPromotion = product?.promotion;

    if (!productHasPromotion) {
      throw new BadRequestException('Этот продукт не имеет скидку');
    }

    const promotionHasProduct = this.checkProductInPromotion(
      product,
      promotion,
    );

    if (!promotionHasProduct) {
      throw new BadRequestException('Этого продукта нету в этой акции');
    }

    await this.productInPromotionRepository.delete({ product, promotion });

    return HttpStatus.OK;
  }

  async getAll() {
    return this.promotionRepository.find();
  }

  async validatePromotion(
    id: number,
    relations: FindOptionsRelations<Promotion> | undefined = undefined,
  ) {
    const promotion = await this.promotionRepository.findOne({
      where: { id },
      relations,
    });

    if (!promotion) {
      throw new NotFoundException('Акция не обнаружена');
    }

    return promotion;
  }

  checkProductInPromotion(product: Product, promotion: Promotion) {
    return promotion.products.some(
      productInPromotion => productInPromotion.product.id === product.id,
    );
  }
}
