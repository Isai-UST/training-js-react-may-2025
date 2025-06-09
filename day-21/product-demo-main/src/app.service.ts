import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject( 'PRODUCT_MICROSERVICE' ) private readonly client: ClientProxy){}
  
  async getHello() {
    const result = await firstValueFrom(this.client.send({ cmd: 'hello' },{}));
    return result;
  }

  createProduct(createProductDto) {
    return this.client.send({ role: 'product', cmd: 'create' }, createProductDto);
  }

  getProductById(id: string) {
    return this.client.send({ role: 'product', cmd: 'get-by-id' }, id);
  }
}
