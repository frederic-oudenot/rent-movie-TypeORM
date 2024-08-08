import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RentalService } from './rental.service';
import { FindOneParams } from 'src/services/validation/validation.service';
import { FilmService } from '../film/film.service';
import { CustomerService } from '../customer/customer.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import checkRentalDate from 'src/services/checkRentalDate';

@ApiTags('rental')
@Controller('rental')
export class RentalController {
  constructor(
    // Get rental service to interact with db
    private readonly rentalService: RentalService,
    // Get rental service to interact witth db
    private readonly filmService: FilmService,
    // Get rental service to interact with db
    private readonly customerService: CustomerService,
    // Get rental service to interact with db
    private readonly inventoryService: InventoryService,
  ) {}

  // endpoint : Get all rental
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all rental',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  async findAll(@Res() res: Response) {
    try {
      // Get all rental from db
      const results = await this.rentalService.findAll();
      // Condition results: ok - return data / null or false - Not found
      results
        ? res.status(HttpStatus.OK).send(results)
        : res.status(HttpStatus.NOT_FOUND).send('Not Found');
    } catch (error) {
      console.error(error);
      //return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return rental from rental_id',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  async findOne(@Param() params: FindOneParams, @Res() res: Response) {
    const { id } = params;
    try {
      // Get rental data from rental_id
      const results = await this.rentalService.findOne(id);
      // Condition results: ok - return data / null or false - Not found
      results
        ? res.status(HttpStatus.OK).send(results)
        : res.status(HttpStatus.NOT_FOUND).send('Not Found');
    } catch (error) {
      console.error(error);
      //return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Message to inform rental was/were created',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  @ApiBody({
    type: [CreateRentalDto],
    description: 'Json structure for rental object',
  })
  async Create(@Body() userData: CreateRentalDto[], @Res() res: Response) {
    // Check all date (interval between 7 to 21 days, ...)
    const reponse = await checkRentalDate(userData);
    // Condition reponse = error message => return bad request and message details
    if (reponse && reponse.length !== 0) {
      return res.status(HttpStatus.BAD_REQUEST).send(reponse);
    }

    try {
      // Create each rental
      for (const data of userData) {
        const { filmId, customerId, rentalDate, returnDate } = data;

        // Check customer exists
        const isExitCustomer = await this.customerService.findOne(customerId);
        // Condition not exist : return not found
        if (!isExitCustomer) {
          return res.status(HttpStatus.NOT_FOUND).send('Customer not Found');
        }

        // Check film exists
        const isExistFilm = await this.filmService.findOne(filmId);
        // Condition not exist : return not found
        if (!isExistFilm) {
          return res.status(HttpStatus.NOT_FOUND).send('Film not Found');
        }

        // Customer and Film exist - preparing data inventory
        const dataInventoryDB = {
          store_id: isExitCustomer.store_id,
          film_id: isExistFilm.film_id,
        };

        // Create a relation between inventory db and customer/film db
        const isCreatedRentalInventory =
          await this.inventoryService.Create(dataInventoryDB);
        // Condition not created : return conflict message
        if (!isCreatedRentalInventory) {
          return res
            .status(HttpStatus.CONFLICT)
            .send('Error during rental processing');
        }

        // Inventory created - preparing data rental
        const dataRentalDB = {
          rental_date: rentalDate,
          return_date: returnDate,
          customer_id: isExitCustomer.customer_id,
          inventory_id: isCreatedRentalInventory[0].inventory_id,
          staff_id: '1',
        };
        // Create a relation between rental db and customer/inventory db
        const isCreatedRental = await this.rentalService.Create(dataRentalDB);
        // Condition not created : return conflict message
        if (!isCreatedRental) {
          return res
            .status(HttpStatus.CONFLICT)
            .send('Error during rental processing');
        }
      }
      // return succeful message
      return res.status(HttpStatus.OK).send('Rent film was/were succefully!');
    } catch (error) {
      console.error(error);
      //return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }
}
