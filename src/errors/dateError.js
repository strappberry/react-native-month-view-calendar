export class DateError extends Error {
  constructor(message) {
    super(message);
    this.name = "DateError";
  }
}
