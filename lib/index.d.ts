import React from 'react';
import { VirtualizedList, Animated, NativeSyntheticEvent, NativeScrollEvent, ViewStyle } from 'react-native';
import { Event } from './contracts/event';
interface MonthViewProps {
    date: Date;
    weekDays: string[];
    events: Event[];
    headerTextStyles: any;
    dayTextStyles?: any;
    pastMonthsCellStyles?: ViewStyle;
    cellStyles?: ViewStyle;
    renderEvent: (event: Event, index: number) => any;
    onSwipe?: (date: Date) => void;
    onSwipePrev?: (date: Date) => void;
    onSwipeNext?: (date: Date) => void;
    onScrollToIndexFailed?: ((info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
    }) => void) | undefined;
}
interface MonthViewState {
    currentDate: Date | null;
    datesList: Date[];
}
declare class MonthViewCalendar extends React.Component<MonthViewProps, MonthViewState> {
    static defaultProps: {
        date: Date;
        weekDays: string[];
        headerTextStyles: {};
        dayTextStyles: {};
        pastMonthsCellStyles: {};
        cellStyles: {};
    };
    state: MonthViewState;
    pageOffset: number;
    currentPageIndex: number;
    monthVirtualList?: VirtualizedList<any>;
    eventsGridScrollX: Animated.Value;
    movingScroll: boolean;
    now: Date;
    constructor(props: MonthViewProps);
    /**
     * Calculate initial array of dates
     */
    calculateInitialDates: (date: Date) => void;
    /**
     * Add new dates to dateList by referencing
     */
    appendPagesInPlace: (datesList: Date[], nPages: number) => void;
    /**
     * Prepend new dates to dateList by referencing
     */
    prependPagesInPlace: (datesList: Date[], nPages: number) => void;
    /**
     * Return date object of the month that is being shown
     */
    getCurrentDate: () => Date;
    /**
     * Change month that is being shown
     */
    goToDate: (date: Date, animated?: boolean) => void;
    /**
     * Move scroll of virtualized list of months to specific index
     */
    scrollTo: (index: number, animated?: boolean) => void;
    scrollBegin: (event: any) => void;
    scrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    setRefOfMonthVirtualList: (ref: VirtualizedList<any>) => void;
    renderWeekCalendar(date: Date): React.ReactNode;
    render(): React.ReactNode;
}
export default MonthViewCalendar;
//# sourceMappingURL=index.d.ts.map