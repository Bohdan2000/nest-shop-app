import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule } from './health';
import { ConfigModule } from '@nestjs/config';
import { NatsConfig, ServerConfig } from './config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/users'),
    UserModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [NatsConfig, ServerConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
