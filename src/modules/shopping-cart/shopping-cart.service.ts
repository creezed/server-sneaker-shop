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
import { interestCalculation } from '@/shared/utils/interestCalculation/interestCalculation.util';

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

  async save(cart: ShoppingCart) {
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

  async getOneWithPrice(id: number) {
    let promotionPrice = 0;
    let price = 0;

    const shoppingCart = await this.validateShoppingCart(id, {
      products: { promotion: true, images: true, inventory: true },
    });
    const products = shoppingCart.products;

    products.forEach(product => {
      if (product.promotion) {
        promotionPrice += interestCalculation(
          product.price,
          product.promotion.discount,
        );
      }

      price += product.price;
    });

    const total = price - promotionPrice;

    return {
      shoppingCart,
      price,
      promotionPrice,
      total,
    };
  }

  async addProduct(id: number, productId: number, sizeId: number) {
    const cart = await this.validateShoppingCart(id, { products: true });

    const product = await this.productService.validateProduct(productId, {
      promotion: true,
      inventory: { size: true },
      brand: { sizes: true },
    });

    const productHasSize = await this.productService.checkProductWithBrandSize(
      product,
      sizeId,
    );

    if (!productHasSize) {
      throw new BadRequestException(
        'Указанный размер отсутсвует у данного бренда',
      );
    }

    const productInInventory = product.inventory.some(
      productInInventory => productInInventory.size.id === sizeId,
    );

    if (!productInInventory) {
      throw new BadRequestException('Товара с таким размером нет в наличии');
    }

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
