import React = require('react');

// import MonthView from './types/monthView';
declare module 'react-native-month-view-calendar' {
    // export class MonthViewCalendar = MonthView;

class MonthView extends React.Component {
    constructor(props: any);
    state: {
        currentDate: any;
        datesList: any[];
    };
    pageOffset: number;
    currentPageIndex: number;
    monthVirtualList: any;
    eventsGridScrollX: any;
    movingScroll: boolean;
    componentDidMount(): void;
    /**
     * Calculate initial dates from -pageOffset to pageOffset
     * @param {Date} date
     */
    calculateInitialDates: (date: Date) => void;
    /**
     * Add new dates to dateList by referencing
     * @param {Array} datesList
     * @param {Number} nPages
     * @returns Array
     */
    appendPagesInPlace: (datesList: any[], nPages: number) => void;
    /**
     * Prepend new dates to dateList by referencing
     * @param {Array} datesList
     * @param {Number} nPages
     * @returns Array
     */
    prependPagesInPlace: (datesList: any[], nPages: number) => void;
    /**
     * Returns current date
     * @returns Date
     */
    getCurrentDate: () => any;
    /**
     * Change month that showing
     * @param {Date} date
     * @param {Boolean} animated
     * @return void|null
     */
    goToDate: (date: Date, animated?: boolean) => any;
    /**
     * Move scroll of virtualized list of months to specific index
     * @param {Number} index
     * @param {Boolean} animated
     */
    scrollTo: (index: number, animated?: boolean) => void;
    scrollBegin: (event: any) => void;
    scrollEnd: (event: any) => void;
    /**
     * Set reference to vitualized list of months
     * @param {VirtualizedList} ref
     */
    monthVirtualListRef: (ref:  any) => void;
    renderWeekCalendar(date: any): any[];
    render(): any;
}
}

