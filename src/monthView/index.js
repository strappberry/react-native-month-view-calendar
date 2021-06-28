import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, VirtualizedList, Animated } from 'react-native'
import {
  getDaysOfCalendarMonth,
  findEventsForTheDay,
  CONTAINER_WIDTH,
} from '../utils'
import styles from '../styles'
import CalendarHeader from '../components/calendarHeader'
import CalendarRow from '../components/calendarRow'
import CalendarDay from '../components/calendarDay'
import { WeekDaysError } from '../errors/weekDaysError'
import { DateError } from 'react-native-month-view-calendar/src/errors/dateError'

class MonthView extends Component {

  state = {
    currentDate: null,
    datesList: [],
  }

  constructor(props) {
    super(props);
    this.pageOffset = 2;
    this.currentPageIndex = this.pageOffset;
    this.monthVirtualList = null;
    this.eventsGridScrollX = new Animated.Value(0);
    this.movingScroll = false;

    if (props.weekDays.length != 7) {
      throw new WeekDaysError('The length of the weekDays array must be 7');
    }
  }
  
  componentDidMount() {
    this.setState({
      currentDate: this.props.date,
    })
    this.calculateInitialDates(this.props.date);
  }

  /**
   * Calculate initial dates from -pageOffset to pageOffset
   * @param {Date} date
   */
  calculateInitialDates = (date) => {
    const initialDates = [];
    for (let i = -this.pageOffset; i <= this.pageOffset; i += 1) {
      const centralDate = new Date(date);
      centralDate.setMonth(centralDate.getMonth() + i);
      initialDates.push(centralDate);
    }
    this.setState({
      datesList: initialDates,
    });
  }

  /**
   * Add new dates to dateList by referencing
   * @param {Array} datesList
   * @param {Number} nPages
   * @returns Array
   */
  appendPagesInPlace = (datesList, nPages) => {
    const latest = datesList[datesList.length - 1];
    for (let i = 1; i <= nPages; i += 1) {
      const newDate = new Date(latest);
      newDate.setMonth(newDate.getMonth() + i);
      datesList.push(newDate)
    }
  };

  /**
   * Prepend new dates to dateList by referencing
   * @param {Array} datesList
   * @param {Number} nPages
   * @returns Array
   */
  prependPagesInPlace = (datesList, nPages) => {
    const first = datesList[0];
    for (let i = 1; i <= nPages; i += 1) {
      const newDate = new Date(first);
      newDate.setMonth(newDate.getMonth() - i);
      datesList.unshift(newDate)
    }
  }

  /**
   * Returns current date
   * @returns Date
   */
  getCurrentDate = () => {
    return this.state.datesList[this.currentPageIndex];
  }

  /**
   * Change month that showing
   * @param {Date} date 
   * @param {Boolean} animated
   * @return void|null
   */
  goToDate = (date, animated = true) => {
    if (!date instanceof Date) {
      throw new DateError('date variable must be an instance of Date');
    }
    if (!this.monthVirtualList) {
      return null;
    }
    const currentDate = this.state.datesList[this.currentPageIndex];
    if (
      currentDate.getMonth() == date.getMonth()
      && currentDate.getFullYear() == date.getFullYear()
    ) {
      return null;
    }

    const index = this.state.datesList.findIndex((item) => {
      return item.getMonth() == date.getMonth()
        && item.getFullYear() == date.getFullYear();
    });

    this.scrollTo(index, animated);
  }

  /**
   * Move scroll of virtualized list of months to specific index
   * @param {Number} index
   * @param {Boolean} animated
   */
  scrollTo = (index, animated = false) => {
    this.monthVirtualList.scrollToIndex({
      index, animated,
    });
    this.currentPageIndex = index;
  }

  scrollBegin = (event) => {
    this.movingScroll = true;
  }

  scrollEnd = (event) => {
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
    const newState = {
      currentDate: newDate,
    };
    let newStateCallback = () => {};
    if (movedPages < 0 && newIndex < this.pageOffset) {
      this.prependPagesInPlace(datesList, 1);
      this.currentPageIndex += 1;

      newState.datesList = [...datesList];
      const scrollToCurrentIndex = () =>
        this.monthVirtualList.scrollToIndex({
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

  /**
   * Set reference to vitualized list of months
   * @param {VirtualizedList} ref
   */
  monthVirtualListRef = (ref) => {
    this.monthVirtualList = ref;
  }

  renderWeekCalendar(date) {
    const days = getDaysOfCalendarMonth(date)

    return days.map((week, i) => (
      <CalendarRow key={`week-${i}`}>
        {week.map((day, j) => {
          const eventsOfDay = findEventsForTheDay(day, this.props.events)
          return (
            <CalendarDay
              key={j}
              index={j}
              date={day}
              events={eventsOfDay}
              renderEvent={this.props.renderEvent}
              textStyles={this.props.dayTextStyles}
            />
          )
        })}
      </CalendarRow>
    ))
  }

  render() {
    if (this.state.datesList.length == 0) {
      return null;
    }

    const { weekDays, headerTextStyles } = this.props;
    return (
      <View style={styles.calendarContainer}>
        <VirtualizedList
          ref={this.monthVirtualListRef}
          keyExtractor={(_, i) => i}
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
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }
}

MonthView.propTypes = {
  date: PropTypes.instanceOf(Date),
  weekDays: PropTypes.array,
  events: PropTypes.array.isRequired,
  headerTextStyles: PropTypes.any,
  dayTextStyles: PropTypes.any,
  renderEvent: PropTypes.func.isRequired,
  onSwipe: PropTypes.func,
  onSwipePrev: PropTypes.func,
  onSwipeNext: PropTypes.func,
}
MonthView.defaultProps = {
  date: new Date(),
  weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  headerTextStyles: {},
  dayTextStyles: {},
}

export default MonthView