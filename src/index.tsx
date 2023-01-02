import React from 'react';
import { View, VirtualizedList, Animated, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Text, ViewStyle } from 'react-native'
import { Event } from './contracts/event';
import CalendarHeader from './components/calendarHeader';
import CalendarRow from './components/calendarRow';
import CalendarDay from './components/calendarDay';
import WeekDaysLenghtError from './errors/weekDaysLengthError';

import {
    getDaysOfCalendarMonth,
    findEventsForTheDay,
    CONTAINER_WIDTH,
} from './utils'

interface MonthViewProps {
    date: Date,
    weekDays: string[],
    events: Event[],
    headerTextStyles: any,
    dayTextStyles?: any,
    pastMonthsCellStyles?: ViewStyle,
    cellStyles?: ViewStyle,
    renderEvent: (event: Event, index: number) => any,
    onSwipe?: (date: Date) => void,
    onSwipePrev?: (date: Date) => void,
    onSwipeNext?: (date: Date) => void,
    onScrollToIndexFailed?: ((info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
    }) => void) | undefined,
}

interface MonthViewState {
    currentDate: Date | null,
    datesList: Date[],
}

class MonthViewCalendar extends React.Component<MonthViewProps, MonthViewState> {
    static defaultProps: { 
        date: Date;
        weekDays: string[];
        headerTextStyles: {};
        dayTextStyles: {};
        pastMonthsCellStyles: {};
        cellStyles: {};
    };

    state: MonthViewState = {
        currentDate: null,
        datesList: [],
    }

    pageOffset: number;
    currentPageIndex: number;
    monthVirtualList?: VirtualizedList<any>;
    eventsGridScrollX: Animated.Value;
    movingScroll: boolean;
    now: Date;

    constructor(props: MonthViewProps) {
        super(props);
        this.now = new Date();
        this.pageOffset = 2;
        this.currentPageIndex = this.pageOffset;
        this.eventsGridScrollX = new Animated.Value(0);
        this.movingScroll = false;

        if (props.weekDays.length != 7) {
            throw new WeekDaysLenghtError(props.weekDays.length.toString());
        }

        this.state.currentDate = props.date;
        this.calculateInitialDates(this.props.date);
    }

    /**
     * Calculate initial array of dates
     */
    calculateInitialDates = (date: Date): void => {
        const initialDates: Date[] = [];

        for (let i = -this.pageOffset; i <= this.pageOffset; i += 1) {
            const centralDate = new Date(date);
            centralDate.setMonth(centralDate.getMonth() + i);
            initialDates.push(centralDate);
        }

        this.state.datesList = initialDates;
    }

    /**
     * Add new dates to dateList by referencing
     */
    appendPagesInPlace = (datesList: Date[], nPages: number): void => {
        const latest = datesList[datesList.length - 1];
        for (let i = 1; i <= nPages; i += 1) {
            const newDate = new Date(latest);
            newDate.setMonth(newDate.getMonth() + i);
            datesList.push(newDate)
        }
    }

    /**
     * Prepend new dates to dateList by referencing
     */
    prependPagesInPlace = (datesList: Date[], nPages: number): void => {
        const first = datesList[0];
        for (let i = 1; i <= nPages; i += 1) {
            const newDate = new Date(first);
            newDate.setMonth(newDate.getMonth() - i);
            datesList.unshift(newDate)
        }
    }

    /**
     * Return date object of the month that is being shown
     */
    getCurrentDate = (): Date => {
        return this.state.datesList[this.currentPageIndex];
    }

    /**
     * Change month that is being shown
     */
    goToDate = (date: Date, animated = true): void => {
        if (!this.monthVirtualList) {
            return;
        }
        const currentDate = this.state.datesList[this.currentPageIndex];
        if (
            currentDate.getMonth() == date.getMonth()
            && currentDate.getFullYear() == date.getFullYear()
        ) {
            return;
        }
      
        const index = this.state.datesList.findIndex((item) => {
            return item.getMonth() == date.getMonth()
            && item.getFullYear() == date.getFullYear();
        });
      
        this.scrollTo(index, animated);
    }

    /**
     * Move scroll of virtualized list of months to specific index
     */
    scrollTo = (index: number, animated = true): void => {
        if (this.monthVirtualList) {
            this.monthVirtualList.scrollToIndex({
                index, animated,
            });
            this.currentPageIndex = index;
        }
    }

    scrollBegin = (event: any) => {
        this.movingScroll = true;
    }

    scrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if(!this.movingScroll) return;
        this.movingScroll = false;
        const {
          nativeEvent: { contentOffset, contentSize },
        } = event;
        const { x: position } = contentOffset;
        const { width: innerWidth } = contentSize;
        const { datesList } = this.state;
        const { onSwipe, onSwipePrev, onSwipeNext } = this.props;
    
        const previousIndex = Number(this.currentPageIndex);
        const newIndex = Math.round((position / innerWidth) * datesList.length);
        const movedPages = newIndex -  this.currentPageIndex;
        this.currentPageIndex = newIndex;
    
        const newDate = datesList[this.currentPageIndex];
        const newState: any = {
          currentDate: newDate,
        };
        let newStateCallback = () => {};
        if (movedPages < 0 && newIndex < this.pageOffset) {
          this.prependPagesInPlace(datesList, 1);
          this.currentPageIndex += 1;
    
          newState.datesList = [...datesList];
          const scrollToCurrentIndex = () =>
            this.monthVirtualList?.scrollToIndex({
              index: this.currentPageIndex,
              animated: false,
            });
          newStateCallback = () => setTimeout(scrollToCurrentIndex, 0);
        } else if (
          movedPages > 0 &&
          newIndex >= this.state.datesList.length - this.pageOffset
        ) {
          this.appendPagesInPlace(datesList, 1);
          newState.datesList = [...datesList];
        }
        this.setState(newState, newStateCallback);
    
        previousIndex != newIndex && onSwipe && onSwipe(datesList[this.currentPageIndex]);
        if (newIndex > previousIndex) {
          onSwipeNext && onSwipeNext(datesList[this.currentPageIndex]);
        } else if(newIndex < previousIndex) {
          onSwipePrev && onSwipePrev(datesList[this.currentPageIndex]);
        }
      }

    setRefOfMonthVirtualList = (ref: VirtualizedList<any>) => {
        this.monthVirtualList = ref;
    }

    renderWeekCalendar(date: Date): React.ReactNode {
        const days = getDaysOfCalendarMonth(date);

        return days.map((week, i) => (
            <CalendarRow key={`week-${i}`}>
                {week.map((day: Date, j: number) => {
                    day.setHours(23, 59, 59)
                    const eventsOfDay = findEventsForTheDay(day, this.props.events)
                    const viewStyles = [
                        this.props.cellStyles,
                        (this.now > day ? this.props.pastMonthsCellStyles : {})
                    ];

                    return (
                        <CalendarDay
                            key={j}
                            index={j}
                            date={day}
                            events={eventsOfDay}
                            renderEvent={this.props.renderEvent}
                            textStyles={this.props.dayTextStyles}
                            viewStyles={viewStyles}
                        />
                    )
                })}
            </CalendarRow>
        ))
    }

    render(): React.ReactNode {
        const { weekDays, headerTextStyles } = this.props;

        return (
            <View style={styles.calendarContainer}>
                <VirtualizedList
                    ref={this.setRefOfMonthVirtualList}
                    keyExtractor={(item) => item}
                    data={this.state.datesList}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    initialScrollIndex={this.pageOffset}
                    horizontal
                    renderItem={({item}) => {
                        return (
                            <View style={{ width: CONTAINER_WIDTH }}>
                                <CalendarHeader
                                weekDays={weekDays}
                                textStyles={headerTextStyles}
                                />
                                {this.renderWeekCalendar(item)}
                            </View>
                        )
                    }}
                    pagingEnabled
                    onMomentumScrollBegin={this.scrollBegin}
                    onMomentumScrollEnd={this.scrollEnd}
                    scrollEventThrottle={32}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.eventsGridScrollX,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: false },
                    )}
                    onScrollToIndexFailed={this.props.onScrollToIndexFailed}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

}

MonthViewCalendar.defaultProps = {
    date: new Date(),
    weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    headerTextStyles: {},
    dayTextStyles: {},
    pastMonthsCellStyles: {},
    cellStyles: {},
}

const styles = StyleSheet.create({
    calendarContainer: {
        minHeight: 300,
        width: '100%',
    },
})

export default MonthViewCalendar;