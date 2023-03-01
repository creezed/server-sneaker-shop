import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAbout } from '@/entities/product-about.entity';
import { Product } from '@/entities/product.entity';
import { BrandService } from '@/modules/brand/services/brand.service';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductAbout)
    private readonly productAboutRepository: Repository<ProductAbout>,
    private readonly brandService: BrandService,
  ) {}

  async getAll() {
    return this.productRepository.find();
  }

  async create(createProductDto: CreateProductDto) {
    const brand = await this.brandService.findById(createProductDto.brandId);

    if (!brand) {
      throw new NotFoundException('Такого бренда не существует');
    }

    const productAbout = await this.productAboutRepository.create({
      shortlyDescription: createProductDto.shortlyDescription,
      description: createProductDto.description,
      manufacturerCountry: createProductDto.manufacturerCountry,
      material: createProductDto.material,
    });

    return this.productRepository.create({
      about: productAbout,
      name: createProductDto.name,
      price: createProductDto.price,
      gender: createProductDto.gender,
      age: createProductDto.age,
      brand: brand,
    });
  }
}
