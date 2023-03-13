import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Favorite } from '@/entities/favorite.entity';
import { Product } from '@/entities/product.entity';
import { ProductService } from '@/modules/product/services/product.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly productService: ProductService,
  ) {}

  async create() {
    const favorite = this.favoriteRepository.create();
    return this.favoriteRepository.save(favorite);
  }

  getOneByUserId(
    userId: number,
    relations: FindOptionsRelations<Favorite> | undefined = undefined,
  ) {
    return this.favoriteRepository.findOne({
      where: { user: { id: userId } },
      relations,
    });
  }

  async addProduct(id: number, productId: number) {
    const favorite = await this.validateFavorite(id, { products: true });

    const product = await this.productService.validateProduct(productId);

    const cartHasProduct = await this.checkProductInFavorite(favorite, product);

    if (cartHasProduct) {
      throw new BadRequestException('Товар уже есть в корзине');
    }

    favorite.products.push(product);

    await this.favoriteRepository.save(favorite);
    return HttpStatus.OK;
  }

  async removeProduct(id: number, productId: number) {
    const cart = await this.validateFavorite(id, { products: true });

    const product = await this.productService.validateProduct(productId);

    const cartHasProduct = await this.checkProductInFavorite(cart, product);

    if (!cartHasProduct) {
      throw new BadRequestException('Товара нет в корзине');
    }

    cart.products = cart.products.filter(
      productInCart => productInCart.id !== productId,
    );

    await this.favoriteRepository.save(cart);
    return HttpStatus.OK;
  }

  async validateFavorite(
    userId: number,
    relations: FindOptionsRelations<Favorite> | undefined = undefined,
  ) {
    const favorite = await this.getOneByUserId(userId, relations);
    if (!favorite) {
      throw new NotFoundException('Избранное не удалось найти');
    }

    return favorite;
  }

  async checkProductInFavorite(favorite: Favorite, product: Product) {
    return favorite.products.some(
      productInFavorite => productInFavorite.id === product.id,
    );
  }
}
