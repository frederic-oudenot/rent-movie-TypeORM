import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { FilmService } from './film.service';
import { Response } from 'express';
import { FindOneParams } from 'src/services/validation/validation.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('film')
@Controller('film')
export class FilmController {
  // Get film service to interact with db
  constructor(private filmService: FilmService) {}

  // endpoint : Get all films
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all films',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  async findAll(@Res() res: Response) {
    try {
      // Get all films
      const results = await this.filmService.findAll();
      // Condition results - return all films / null or false - not found
      results
        ? res.status(HttpStatus.OK).send(results)
        : res.status(HttpStatus.NOT_FOUND).send('Not Found');
    } catch (error) {
      console.error(error);
      // return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }

  // endpoint : Get one film
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return one film',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  async findOne(@Param() params: FindOneParams, @Res() res: Response) {
    const { id } = params;
    try {
      // Get one film
      const results = await this.filmService.findOne(id);
      // Condition results - return all films / null or false - not found
      results
        ? res.status(HttpStatus.OK).send(results)
        : res.status(HttpStatus.NOT_FOUND).send('Not Found');
    } catch (error) {
      console.error(error);
      // return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }
}
