import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create_product.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>){}

  getHello(): string {
    return 'Hello from microservice!';
  }

  createProduct(productDto: CreateProductDto) {
    return new this.productModel(productDto).save();
  }

  getProductById(id) {
    return this.productModel.findById(id);
  }
}
