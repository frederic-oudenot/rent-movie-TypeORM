import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { FindOneParams } from 'src/services/validation/validation.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // endpoint : Get all customers
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returning all customers',
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
      // Get all customers data
      const results = await this.customerService.findAll();
      // Condition results - return customers data / null or false - not found
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

  //endpoint : Get one customer
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returning one customer',
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
      // Get one customer data
      const results = await this.customerService.findOne(id);
      // Condition results - return customer data / null or false - not found
      results
        ? res.status(HttpStatus.OK).send(results)
        : res.status(HttpStatus.NOT_FOUND).send('Not Found');
    } catch (error) {
      console.error(error);
      // return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(`INTERNAL_SERVER_ERROR`);
    }
  }

  //endpoint : Update one customer
  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Message sucess',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  @ApiBody({
    type: UpdateCustomerDto,
    description: 'Json structure for customer object',
  })
  async Update(
    @Param() params: FindOneParams,
    @Body() data: UpdateCustomerDto,
    @Res() res: Response,
  ) {
    const { id } = params;

    // Check if customer exist
    const isExistCustomer = await this.customerService.findOne(id);
    // Condition : customer not exist - not found
    if (!isExistCustomer) {
      return res.status(HttpStatus.NOT_FOUND).send('Not Found');
    }

    try {
      // Update customer data according customer_id
      const results = await this.customerService.Update(id, data);
      // Condition result - return succeful message / null or false - return message not found
      results
        ? res.status(HttpStatus.OK).send('Account updated')
        : res.status(HttpStatus.NOT_FOUND).send('Not Found');
    } catch (error) {
      console.error(error);
      // return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(`INTERNAL_SERVER_ERROR`);
    }
  }

  //endpoint : Add one customer
  @Post('add')
  @ApiResponse({
    status: 201,
    description: 'Message sucess',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  @ApiBody({
    type: UpdateCustomerDto,
    description: 'Json structure for customer object',
  })
  async Create(@Body() data: CreateCustomerDto, @Res() res: Response) {
    // Preparing dataDB according customer data
    // store_id, adress_id, activebool and active were written by default value
    // Possibility to prepare entities in the future
    const dataDB = {
      ...data,
      store_id: '1',
      address_id: '1',
      activebool: true,
      active: '1',
    };
    try {
      // Check if customer has already an account
      const isExist = await this.customerService.findEmail(dataDB.email);

      // Condition : customer exists return message error
      if (isExist) {
        return res
          .status(HttpStatus.CONFLICT)
          .send(`${data?.email} has already an account`);
      }

      // Create account according dataDb prepared (customer data and default values)
      const created = await this.customerService.Create(dataDB);

      // Condition : customer created return succeful message
      if (created) {
        return res
          .status(HttpStatus.CREATED)
          .send('Account is created succefully');
      }
    } catch (error) {
      console.error(error);
      // return internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(`INTERNAL_SERVER_ERROR`);
    }
  }
}
