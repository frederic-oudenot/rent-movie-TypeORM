import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { filmProviders } from './film.providers';
import { FilmService } from './film.service';

@Module({
  controllers: [FilmController],
  providers: [FilmService, ...filmProviders],
  exports: [FilmService],
})
export class FilmModule {}
