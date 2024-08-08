import { Body, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  // Get rental service to interact with db
  constructor(private tasksService: TasksService) {}

  // endpoint : running CronJob
  @Get('run')
  @ApiResponse({
    status: 200,
    description: 'Message to confirm schedules running',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message to refuse because of a bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  findCronLaunched(@Res() res: Response) {
    try {
      //Get all Crons created
      const results = this.tasksService.getCrons();

      // Condition : result null or false : not found
      if (!results) {
        return res.status(HttpStatus.NOT_FOUND).send('Not Found');
      }

      // return all Crons created and next date
      return res.status(HttpStatus.OK).send(results);
    } catch (error) {
      console.error(error);
      // return internal error servor
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }

  // endpoint : launching manually CronJob
  @Get('launch')
  @ApiResponse({
    status: 200,
    description: 'Message to launch manually schedule',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Message to refuse because of a bad request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Message internal server error',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Json structure for tasks object',
  })
  async launchManuallyCron(@Body() data: CreateTaskDto, @Res() res: Response) {
    try {
      const { notifications } = data;
      // Condition : Launch reminder d-5
      if (notifications === 'd-5') {
        // Get a result information after launching Cron job
        const results =
          await this.tasksService.sendingMailReminderDayMinusFive();
        // Condition : result null or false : bad request
        if (!results) {
          return res.status(HttpStatus.BAD_REQUEST).send('BAD_REQUEST');
        }
        // return : cron job was released manually
        return res.status(HttpStatus.OK).send(results);
      }
      // Condition : Launch reminder d-5
      if (notifications === 'd-3') {
        // Get a result information after launching Cron job
        const results =
          await this.tasksService.sendingMailReminderDayMinusThree();
        // Condition : result null or false : bad request
        if (!results) {
          return res.status(HttpStatus.BAD_REQUEST).send('BAD_REQUEST');
        }
        // return : cron job was released manually
        return res.status(HttpStatus.OK).send(results);
      }

      // return bad request
      return res.status(HttpStatus.BAD_REQUEST).send('BAD_REQUEST');
    } catch (error) {
      console.error(error);
      // returnt internal server error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('INTERNAL_SERVER_ERROR');
    }
  }
}
