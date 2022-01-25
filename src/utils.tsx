import { Dimensions } from 'react-native';
import { Event } from './contracts/event';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const CONTAINER_WIDTH = SCREEN_WIDTH;

/**
 * Get days for month calendar
 * @param {Date} currentDate 
 */
export function getDaysOfCalendarMonth (currentDate: Date) {
  let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const days = []
  while (date.getMonth() === currentDate.getMonth()) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  const firstDate = new Date(days[0])
  if (firstDate.getDay() > 0) {
    while(firstDate.getDay() > 0) {
      firstDate.setDate(firstDate.getDate() - 1)
      days.unshift(new Date(firstDate))
    }
  }
  const lastDate = new Date(days[days.length - 1])
  if (lastDate.getDay() < 6) {
    while (lastDate.getDay() < 6) {
      lastDate.setDate(lastDate.getDate() + 1)
      days.push(new Date(lastDate))
    }
  }
  let result = days.reduce((resultArray: any[], item: Date, index: number) => {
    const chunkIndex = Math.floor(index/7)
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])

  return result
}

/**
 * Search events for the day in events array
 * @param {Date} date 
 * @param {Array} events 
 * @returns Array
 */
export function findEventsForTheDay (date: Date, events: Event[]): Event[] {
  return events.filter((event, index) => {
    return event.date.getDate() == date.getDate()
      && event.date.getMonth() == date.getMonth()
      && event.date.getFullYear() == date.getFullYear();
  })
}
