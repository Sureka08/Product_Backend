import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../models/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(body: CreateProductDto) {
    return this.productModel.create(body);
  }

  async findAll() {
    return this.productModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, body: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Deleted successfully' };
  }
}