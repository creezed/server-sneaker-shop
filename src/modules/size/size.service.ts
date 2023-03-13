import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from '@/entities/size.entity';
import { BrandService } from '@/modules/brand/brand.service';
import { CreateSizeDto } from '@/modules/size/dto/create-size.dto';
import { UpdateSizeDto } from '@/modules/size/dto/update-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly brandSizeRepository: Repository<Size>,
    private readonly brandService: BrandService,
  ) {}
  async create(
    brandId: number,
    createBrandSizeDto: CreateSizeDto,
  ): Promise<Size> {
    const brand = await this.brandService.validateBrand(brandId);

    const newSize = this.brandSizeRepository.create({
      brand: brand,
      ...createBrandSizeDto,
    });

    return this.brandSizeRepository.save(newSize);
  }

  async findAll() {
    return this.brandSizeRepository.find();
  }

  findById(id: number) {
    return this.brandSizeRepository.findOne({ where: { id } });
  }

  async findByBrandId(brandId: number) {
    const brand = await this.brandService.validateBrand(brandId);

    return this.brandSizeRepository.find({
      where: {
        brand: {
          id: brand.id,
        },
      },
    });
  }

  async update(id: number, updateBrandSizeDto: UpdateSizeDto) {
    const size = await this.validateSize(id);

    return this.brandSizeRepository.update(size.id, updateBrandSizeDto);
  }

  async remove(id: number) {
    const size = await this.validateSize(id);

    return this.brandSizeRepository.delete(size.id);
  }

  async validateSize(sizeId: number) {
    const size = await this.findById(sizeId);

    if (!size) {
      throw new NotFoundException('Такого размера не существует');
    }

    return size;
  }
}
