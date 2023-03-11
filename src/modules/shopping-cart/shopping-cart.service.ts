import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { Product } from '@/entities/product.entity';
import { ShoppingCart } from '@/entities/shopping-cart.entity';
import { ProductService } from '@/modules/product/services/product.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    private readonly productService: ProductService,
  ) {}

  async create() {
    const cart = this.shoppingCartRepository.create();
    return this.shoppingCartRepository.save(cart);
  }

  getOneById(
    id: number,
    relations: FindOptionsRelations<ShoppingCart> | undefined = undefined,
  ) {
    return this.shoppingCartRepository.findOne({
      where: { id },
      relations,
    });
  }

  async addProduct(id: number, productId: number) {
    const cart = await this.validateShoppingCart(id, { products: true });

    const product = await this.productService.validateProduct(productId);

    const cartHasProduct = await this.checkProductInCart(cart, product);

    if (cartHasProduct) {
      throw new BadRequestException('Товар уже есть в корзине');
    }

    cart.products.push(product);

    await this.shoppingCartRepository.save(cart);
    return HttpStatus.OK;
  }

  async removeProduct(id: number, productId: number) {
    const cart = await this.validateShoppingCart(id, { products: true });

    const product = await this.productService.validateProduct(productId);

    const cartHasProduct = await this.checkProductInCart(cart, product);

    if (!cartHasProduct) {
      throw new BadRequestException('Товара нет в корзине');
    }

    cart.products = cart.products.filter(
      productInCart => productInCart.id !== productId,
    );

    await this.shoppingCartRepository.save(cart);
    return HttpStatus.OK;
  }

  async validateShoppingCart(
    id: number,
    relations: FindOptionsRelations<ShoppingCart> | undefined = undefined,
  ) {
    const cart = await this.getOneById(id, relations);
    if (!cart) {
      throw new NotFoundException('Корзину не удалось найти');
    }

    return cart;
  }

  async checkProductInCart(cart: ShoppingCart, product: Product) {
    return cart.products.some(productInCart => productInCart.id === product.id);
  }
}
