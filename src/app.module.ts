import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule } from './health';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UploadModule,
    MongooseModule.forRoot('mongodb://localhost:27017/products'),
    ProductsModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
