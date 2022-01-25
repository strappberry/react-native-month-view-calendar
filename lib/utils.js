"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEventsForTheDay = exports.getDaysOfCalendarMonth = exports.CONTAINER_WIDTH = void 0;
var react_native_1 = require("react-native");
var _a = react_native_1.Dimensions.get('window'), SCREEN_WIDTH = _a.width, SCREEN_HEIGHT = _a.height;
exports.CONTAINER_WIDTH = SCREEN_WIDTH;
/**
 * Get days for month calendar
 * @param {Date} currentDate
 */
function getDaysOfCalendarMonth(currentDate) {
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    var days = [];
    while (date.getMonth() === currentDate.getMonth()) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    var firstDate = new Date(days[0]);
    if (firstDate.getDay() > 0) {
        while (firstDate.getDay() > 0) {
            firstDate.setDate(firstDate.getDate() - 1);
            days.unshift(new Date(firstDate));
        }
    }
    var lastDate = new Date(days[days.length - 1]);
    if (lastDate.getDay() < 6) {
        while (lastDate.getDay() < 6) {
            lastDate.setDate(lastDate.getDate() + 1);
            days.push(new Date(lastDate));
        }
    }
    var result = days.reduce(function (resultArray, item, index) {
        var chunkIndex = Math.floor(index / 7);
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);
    return result;
}
exports.getDaysOfCalendarMonth = getDaysOfCalendarMonth;
/**
 * Search events for the day in events array
 * @param {Date} date
 * @param {Array} events
 * @returns Array
 */
function findEventsForTheDay(date, events) {
    return events.filter(function (event, index) {
        return event.date.getDate() == date.getDate()
            && event.date.getMonth() == date.getMonth()
            && event.date.getFullYear() == date.getFullYear();
    });
}
exports.findEventsForTheDay = findEventsForTheDay;
//# sourceMappingURL=utils.js.map