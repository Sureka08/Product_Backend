import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { Get, Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';

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
@Patch(':id')
update(@Param('id') id: string, @Body() body: UpdateProductDto) {
  return this.productsService.update(id, body);
}
}