import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Exclude()
  _id: mongoose.Types.ObjectId;

  id: string;
  
  @Prop({ required: true })
  name: string;

  constructor(partial: Partial<Product>) {
    partial.id = partial._id.toString();
    Object.assign(this, partial);
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
