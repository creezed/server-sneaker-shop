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

  async save(cart: ShoppingCart) {
    return this.shoppingCartRepository.save(cart);
  }

  getOneByUserId(
    userId: number,
    relations: FindOptionsRelations<ShoppingCart> | undefined = undefined,
  ) {
    return this.shoppingCartRepository.findOne({
      where: { user: { id: userId } },
      relations,
    });
  }

  async getOneWithPriceByUserId(userId: number) {
    let promotionPrice = 0;
    let price = 0;

    const shoppingCart = await this.validateShoppingCart(userId, {
      products: {
        size: true,
        product: {
          promotion: true,
          images: true,
        },
      },
    });
    const shoppingCartProducts = shoppingCart.products;

    shoppingCartProducts.forEach(products => {
      if (products.product.promotion) {
        promotionPrice += interestCalculation(
          products.product.price,
          products.product.promotion.discount,
        );
      }

      price += products.product.price;
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
    // const size = await this.brandSizeService.validateSize(sizeId);
    //
    // const cart = await this.validateShoppingCart(id, {
    //   products: { product: true },
    // });
    console.log(id);
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

    return HttpStatus.OK;
  }

  async removeProduct(id: number, productId: number) {
    const cart = await this.validateShoppingCart(id, {
      products: {
        product: true,
      },
    });

    const product = await this.productService.validateProduct(productId);

    const cartHasProduct = await this.checkProductInCart(cart, product);

    if (!cartHasProduct) {
      throw new BadRequestException('Товара нет в корзине');
    }

    cart.products = cart.products.filter(
      productInCart => productInCart.product.id !== productId,
    );

    await this.shoppingCartRepository.save(cart);
    return HttpStatus.OK;
  }

  async validateShoppingCart(
    userId: number,
    relations: FindOptionsRelations<ShoppingCart> | undefined = undefined,
  ) {
    const cart = await this.getOneByUserId(userId, relations);
    if (!cart) {
      throw new NotFoundException('Корзину не удалось найти');
    }

    return cart;
  }

  async checkProductInCart(cart: ShoppingCart, product: Product) {
    return cart.products.some(
      cartProduct => cartProduct.product.id === product.id,
    );
  }
}
