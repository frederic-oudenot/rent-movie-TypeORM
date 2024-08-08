import { Inject, Injectable } from '@nestjs/common';
import { Film } from './entity/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmService {
  constructor(
    @Inject('FILM_REPOSITORY') // inject provide film
    private readonly filmRepository: Repository<Film>, // Get film repository to interact with db
  ) {}
  // Get all films
  async findAll() {
    const results = await this.filmRepository.find();
    return results;
  }

  // Get one film
  async findOne(id: number) {
    const results = await this.filmRepository.findOne({
      where: { film_id: id },
    });
    return results;
  }
}
