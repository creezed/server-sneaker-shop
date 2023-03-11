import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from '@/entities/payment-method.entity';
import { CreatePaymentMethodDto } from '@/modules/order/dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '@/modules/order/dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const paymentMethod = this.paymentMethodRepository.create(
      createPaymentMethodDto,
    );
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async getAll() {
    return this.paymentMethodRepository.find();
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const paymentMethod = await this.validatePaymentMethod(id);
    return this.paymentMethodRepository.update(
      { id: paymentMethod.id },
      updatePaymentMethodDto,
    );
  }

  async remove(id: number) {
    const paymentMethod = await this.validatePaymentMethod(id);

    return this.paymentMethodRepository.delete({ id: paymentMethod.id });
  }

  async validatePaymentMethod(id: number) {
    const paymentMethod = await this.paymentMethodRepository.findOneBy({
      id,
    });

    if (!paymentMethod) {
      throw new NotFoundException('Способ оплаты не найден');
    }

    return paymentMethod;
  }
}
