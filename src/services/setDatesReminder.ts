export default function setDatesReminder(timeDate: Date, reminderDay: number) {
  // set dataformat
  const calculateReminderTime = new Date(timeDate);
  // reduce day to timeDate
  calculateReminderTime.setDate(calculateReminderTime.getDate() - reminderDay);
  //return reminder start or end date
  return calculateReminderTime;
}
