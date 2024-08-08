import { CreateRentalDto } from 'src/modules/rental/dto/create-rental.dto';

export default async function checkRentalDate(userData: CreateRentalDto[]) {
  // Init an array
  const response = [];

  // Check all data
  for (const data of userData) {
    const { filmId, rentalDate, returnDate } = data;

    // Init and set format today date
    const rightNowDate = new Date(Date.now());
    // Init and set format rental date
    const rentalDateConvert = new Date(rentalDate);
    // Init and set format return date
    const returnDateConvert = new Date(returnDate);

    // Calculate interval between return_date and rental_date
    const caculateDate =
      (returnDateConvert.getTime() - rentalDateConvert.getTime()) /
      (1000 * 60 * 60 * 24);

    // Condition: rental date before today and equal to return date or rental date over return date : bad request
    if (
      rightNowDate < rentalDate ||
      rentalDate === returnDate ||
      rentalDate > returnDate
    ) {
      // Preparing film_id and message error
      response.push({ filmId: filmId, error: 'Incorrect date' });
    }

    // Condition interval inferior to 7days or superior to 21 days : bad request
    if (caculateDate <= 7 || caculateDate >= 21) {
      // Preparing film_id and message error
      response.push({
        filmId: filmId,
        error: 'Incorrect interval rental. Rent between 7 to 21 days',
      });
    }
  }
  //return response
  return response;
}
