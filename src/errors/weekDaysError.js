export class WeekDaysError extends Error {
  constructor(message) {
    super(message)
    this.name = "WeekDaysError"
  }
}
