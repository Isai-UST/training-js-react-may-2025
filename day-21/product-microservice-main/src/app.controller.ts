import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create_product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'hello'})
  getHello(): string {
    console.log('hello..');
    return this.appService.getHello();
  }

  @MessagePattern({ role: 'product', cmd: 'create'})
  async createProduct(@Payload() productDto: CreateProductDto) {
    console.log('creating...');
    const createData = await this.appService.createProduct(productDto);
    if(createData) {
      return {
      status : 200 ,
      message: 'Product created successfully'
      }
    }else {
      return {
        status : 500 ,
        message: 'Something went wrong!'
      }
    }
  }

  @MessagePattern({ role: 'product', cmd: 'get-by-id' })
  async getProductById(@Payload() id: string) {
    console.log('getting...');
    return await this.appService.getProductById(id);
  }

}
