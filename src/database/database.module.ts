import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Global() // Sharing module in all modules project
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
