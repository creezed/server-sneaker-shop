import { Entity } from 'typeorm';
import { Base } from '@/entities/base';

@Entity('Product')
export class Product extends Base {}
