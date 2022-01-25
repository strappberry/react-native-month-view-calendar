import { Event } from './contracts/event';
export declare const CONTAINER_WIDTH: number;
/**
 * Get days for month calendar
 * @param {Date} currentDate
 */
export declare function getDaysOfCalendarMonth(currentDate: Date): any[];
/**
 * Search events for the day in events array
 * @param {Date} date
 * @param {Array} events
 * @returns Array
 */
export declare function findEventsForTheDay(date: Date, events: Event[]): Event[];
//# sourceMappingURL=utils.d.ts.map