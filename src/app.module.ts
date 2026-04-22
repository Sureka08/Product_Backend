import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');

        if (!mongoUri) {
          throw new Error('MONGODB_URI is not defined');
        }

        return { uri: mongoUri };
      },
    }),
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}