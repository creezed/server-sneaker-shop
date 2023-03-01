import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandSize } from '@/entities/brand-size.entity';
import { CreateBrandSizeDto } from '@/modules/brand/dto/brandSize/create-brand-size.dto';
import { UpdateBrandSizeDto } from '@/modules/brand/dto/brandSize/update-brand-size.dto';
import { BrandService } from '@/modules/brand/services/brand.service';

@Injectable()
export class BrandSizeService {
  constructor(
    @InjectRepository(BrandSize)
    private readonly brandSizeRepository: Repository<BrandSize>,
    private readonly brandService: BrandService,
  ) {}
  async create(
    brandId: number,
    createBrandSizeDto: CreateBrandSizeDto,
  ): Promise<BrandSize> {
    const brand = await this.brandService.findById(brandId);

    if (!brand) {
      throw new BadRequestException('Такого бренда не существует');
    }

    const newSize = this.brandSizeRepository.create({
      brand: brand,
      ...createBrandSizeDto,
    });

    return this.brandSizeRepository.save(newSize);
  }

  async findAll(): Promise<BrandSize[]> {
    return this.brandSizeRepository.find();
  }

  findById(id: number): Promise<BrandSize | null> {
    return this.brandSizeRepository.findOne({ where: { id } });
  }

  async findByBrandId(brandId: number) {
    const brand = await this.brandService.findById(brandId);
    if (!brand) {
      throw new NotFoundException('Такой бренд не существует');
    }
    return this.brandSizeRepository.find({
      where: {
        brand: {
          id: brand.id,
        },
      },
    });
  }

  async update(id: number, updateBrandSizeDto: UpdateBrandSizeDto) {
    const size = await this.findById(id);

    if (!size) {
      throw new NotFoundException('Такого размера не существует');
    }

    return this.brandSizeRepository.update(id, updateBrandSizeDto);
  }

  async remove(id: number) {
    const size = await this.findById(id);

    if (!size) {
      throw new NotFoundException('Такого размера не существует');
    }

    return this.brandSizeRepository.delete(id);
  }
}
