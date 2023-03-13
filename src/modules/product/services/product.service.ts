import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
import { ProductAbout } from '@/entities/product-about.entity';
import { Product } from '@/entities/product.entity';
import { BrandService } from '@/modules/brand/brand.service';
import { ImagesService } from '@/modules/images/images.service';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';
import { UpdateProductDto } from '@/modules/product/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductAbout)
    private readonly productAboutRepository: Repository<ProductAbout>,
    private readonly brandService: BrandService,
    private readonly imageService: ImagesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const brand = await this.brandService.validateBrand(
      createProductDto.brandId,
    );

    const productAbout = await this.productAboutRepository.create({
      shortlyDescription: createProductDto.shortlyDescription,
      description: createProductDto.description,
      manufacturerCountry: createProductDto.manufacturerCountry,
      material: createProductDto.material,
    });

    const newProduct = this.productRepository.create({
      about: productAbout,
      name: createProductDto.name,
      price: createProductDto.price,
      gender: createProductDto.gender,
      age: createProductDto.age,
      brand: brand,
    });

    await this.productRepository.save(newProduct);

    return newProduct;
  }

  async getAll() {
    return this.productRepository.find({
      relations: {
        images: true,
        promotion: true,
        brand: true,
        inventory: true,
      },
    });
  }

  async getOne(id: number) {
    return this.findOneById(id, {
      about: true,
      images: true,
      brand: true,
      promotion: true,
      inventory: { size: true },
    });
  }

  async findOneById(
    id: number,
    relations: FindOptionsRelations<Product> | undefined = undefined,
  ) {
    return this.productRepository.findOne({
      where: { id },
      relations,
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.validateProduct(id, { about: true });

    const brand = await this.brandService.validateBrand(updateProductDto.brand);

    await this.productAboutRepository.update(product.about.id, {
      shortlyDescription: updateProductDto.about.shortlyDescription,
      description: updateProductDto.about.description,
      manufacturerCountry: updateProductDto.about.manufacturerCountry,
      material: updateProductDto.about.material,
    });
    return this.productRepository.update(product.id, {
      name: updateProductDto.name,
      price: updateProductDto.price,
      gender: updateProductDto.gender,
      age: updateProductDto.age,
      brand: brand,
    });
  }

  async delete(id: number) {
    const product = await this.validateProduct(id, {
      about: true,
      images: true,
    });

    const about = await this.productAboutRepository.findOne({
      where: { id: product.about.id },
    });

    if (!about) {
      throw new NotFoundException('Такого продукта не существует');
    }

    product.images.map(image => this.imageService.removeImage(image.small));

    return this.productAboutRepository.delete(about.id);
  }

  async checkProductWithBrandSize(product: Product, sizeId: number) {
    return product.brand.sizes.some(size => size.id === sizeId);
  }

  async validateProduct(
    id: number,
    relations: FindOptionsRelations<Product> | undefined = undefined,
  ) {
    const product = await this.findOneById(id, relations);

    if (!product) {
      throw new NotFoundException('Такого продукта не существует');
    }

    return product;
  }
}
