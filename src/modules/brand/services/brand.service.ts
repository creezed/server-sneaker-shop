import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from '../dto/brand/create-brand.dto';
import { UpdateBrandDto } from '../dto/brand/update-brand.dto';
import { Brand } from '@/entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = await this.findByValue(createBrandDto.value);
    if (brand) {
      throw new BadRequestException('Такой бренд уже сущесвтвует');
    }

    const newBrand = await this.brandRepository.create(createBrandDto);
    await this.brandRepository.save(newBrand);

    return newBrand;
  }

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  findByValue(value: string): Promise<Brand | null> {
    return this.brandRepository.findOne({ where: { value } });
  }

  findById(id: number): Promise<Brand | null> {
    return this.brandRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findById(id);

    if (!brand) {
      throw new NotFoundException('Такого бренда не существует');
    }

    return this.brandRepository.update(id, updateBrandDto);
  }

  async remove(id: number) {
    const brand = await this.findById(id);

    if (!brand) {
      throw new NotFoundException('Такого бренда не существует');
    }

    return this.brandRepository.delete(id);
  }

  async validateBrand(id: number) {
    const brand = await this.findById(id);

    if (!brand) {
      throw new NotFoundException('Такого бренда не существует');
    }

    return brand;
  }
}
