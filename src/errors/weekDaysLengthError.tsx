class WeekDayLengthError extends Error {

    constructor(message: string) {
        super(`Week days length must be 7 but got ${message}`);
        this.name = 'WeekDayLengthError';
    }

}

export default WeekDayLengthError;