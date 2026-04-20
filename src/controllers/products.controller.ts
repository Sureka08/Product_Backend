import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }
  @Get()
findAll() {
  return this.productsService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.productsService.findOne(id);
}
}