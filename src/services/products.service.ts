import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../models/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(body: CreateProductDto) {
    return this.productModel.create(body);
  }
  async findAll() {
  return this.productModel.find().sort({ createdAt: -1 });
}

async findOne(id: string) {
  return this.productModel.findById(id);
}
async update(id: string, body: any) {
  return this.productModel.findByIdAndUpdate(id, body, { new: true });
}
}