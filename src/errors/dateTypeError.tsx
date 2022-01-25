class DateTypeError extends Error {

    constructor(message: string) {
        super(`${message} is not a valid date.`);
        this.name = 'DateTypeError';
    }

}

export default DateTypeError;