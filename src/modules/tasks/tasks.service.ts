import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { RentalService } from '../rental/rental.service';
import { CustomerService } from '../customer/customer.service';
import setDatesReminder from 'src/services/setDatesReminder';

@Injectable()
export class TasksService {
  // Inject logger with Tasks Service name
  private readonly logger = new Logger(TasksService.name);

  constructor(
    // Get rental table repository to interact with db and tasksService
    private readonly rentalRepository: RentalService,
    // Get customer table repository to interact with db and tasksService
    private readonly customerRepository: CustomerService,
    // Interact to all Cron name
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // Get today date
  rightNowDate = new Date(Date.now());

  // Get start date - Following to db last updated for rental movie was 02/09/2005
  // Possibility to change it by rightNowDate variable and transform it to UTC time 00:00:00
  startDate = new Date('02 September 2005 00:00 UTC');

  // Get start date - Following to db last updated for rental movie was 02/09/2005
  // Possibility to change it by rightNowDate variable and transform it to UTC time 23:59:59
  endDate = new Date('02 September 2005 23:59 UTC');

  // Cron schedule : Check every 6 hours if all crons still running
  // Logger into terminal to check
  @Cron(CronExpression.EVERY_6_HOURS, {
    name: 'notifications cron running',
    timeZone: 'Europe/Paris',
  })
  // Function to get all Crons created
  getCrons() {
    // init jobs to compile all Crons created
    const jobs = this.schedulerRegistry.getCronJobs();
    // init loggerCron to return information
    const loggerCron = [];

    jobs.forEach((value, key) => {
      // init to check all jobs notifications and nextJob scheduled
      let nextJob;
      try {
        // return nextJob into date format to one notifications
        nextJob = value.nextDate().toJSDate();
      } catch (e) {
        // return an error for a notification
        nextJob = 'error: next fire date is in the past!';
      }
      // return a message into logger
      this.logger.log(`job: ${key} -> next: ${nextJob}`);
      // get data to return information into json format
      loggerCron.push(`job: ${key} -> next: ${nextJob}`);
    });
    return loggerCron;
  }

  // Cron schedule : Every day at noon, reminder to all customers if rental(s) were d-5
  // Logger into terminal to check
  @Cron(CronExpression.EVERY_DAY_AT_NOON, {
    name: 'notifications day d-5',
    timeZone: 'Europe/Paris',
  })
  //Function : sending a mail reminder D-5
  async sendingMailReminderDayMinusFive() {
    try {
      // set date format to start reminder time according to reminder day
      const startReminderTime = setDatesReminder(this.startDate, 5);
      // set date format to end reminder time according to reminder day
      const endReminderTime = setDatesReminder(this.endDate, 5);

      // Get all rental information
      const result = await this.rentalRepository.findAll();

      //Check each rental data
      result.forEach(async (rental) => {
        // Condition to not check return date null
        if (rental.return_date != null) {
          // Set date format
          const returnDate = new Date(rental.return_date);

          // Condition return date between start and end reminder
          if (returnDate > startReminderTime && returnDate <= endReminderTime) {
            // Get customer information according rental_id
            const customerResult = await this.customerRepository.findOne(
              rental.customer_id,
            );
            // Create a log to simulate a sending mail
            this.logger.log(
              `Mailto : ${customerResult.email}
              Bonjour ${customerResult.first_name} ${customerResult.last_name}, nous vous informons que votre location : ${rental.inventory.film.title} doit être retourné dans les 5 jours restants.`,
            );
          }
        }
      });
      // return a succeful message
      return { result: 'Reminder done d-5!' };
    } catch (error) {
      console.error(error);
    }
  }

  // Cron schedule : Every day at noon, reminder to all customers if rental(s) were d-3
  // Logger into terminal to check
  @Cron(CronExpression.EVERY_DAY_AT_NOON, {
    name: 'notifications day d-3',
    timeZone: 'Europe/Paris',
  })
  //Function : sending a mail reminder D-3
  async sendingMailReminderDayMinusThree() {
    try {
      // set date format to start reminder time according to reminder day
      const startReminderTime = setDatesReminder(this.startDate, 3);
      // set date format to start reminder time according to reminder day
      const endReminderTime = setDatesReminder(this.endDate, 3);

      // Get all rental information
      const result = await this.rentalRepository.findAll();

      //Check each rental data
      result.forEach(async (rental) => {
        // Condition to not check return date null
        if (rental.return_date != null) {
          // Set date format
          const returnDate = new Date(rental.return_date);

          // Condition return date between start and end reminder
          if (returnDate > startReminderTime && returnDate <= endReminderTime) {
            // Get customer information according rental_id
            const customerResult = await this.customerRepository.findOne(
              rental.customer_id,
            );

            // Create a log to simulate a sending mail
            this.logger.log(
              `Mailto : ${customerResult.email}
              Bonjour ${customerResult.first_name} ${customerResult.last_name}, nous vous informons que votre location : ${rental.inventory.film.title} doit être retourné dans les 3 jours restants.`,
            );
          }
        }
      });
      // return a succeful message
      return { result: 'Reminder done : d-3!' };
    } catch (error) {
      console.error(error);
    }
  }
}
