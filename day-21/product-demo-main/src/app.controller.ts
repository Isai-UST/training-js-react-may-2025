import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/product/:id')
  getById(@Param('id') id: string) {
    return this.appService.getProductById(id);
  }

  @Post('/create')
  create(@Body() createProductDto) {
    return this.appService.createProduct(createProductDto);
  }
}
