import { imageSize } from '@/modules/images/const/size.const';

export interface ImagesResponse
  extends Partial<{ [K in keyof typeof imageSize]: string }> {
  originalName: string;
}
