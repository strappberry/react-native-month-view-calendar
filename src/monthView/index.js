import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { getDaysOfCalendarMonth, findEventsForTheDay } from '../utils'
import styles from '../styles'
import CalendarHeader from '../components/calendarHeader'
import CalendarRow from '../components/calendarRow'
import CalendarDay from '../components/calendarDay'
import { WeekDaysError } from '../errors/weekDaysError'
import { DateError } from 'react-native-month-view-calendar/src/errors/dateError'

class MonthView extends Component {

  state = {
    date: null,
  }

  constructor(props) {
    super(props);

    if (props.weekDays.length != 7) {
      throw new WeekDaysError('The length of the weekDays array must be 7');
    }
  }

  componentDidMount() {
    this.setState({
      date: this.props.date,
    })
  }

  /**
   * Change month that showing
   * @param {Date} date 
   */
  goToDate(date) {
    if (!date instanceof Date) {
      throw new DateError('date variable must be an instance of Date');
    }
    this.setState({
      date: date,
    })
  }

  renderWeekCalendar() {
    const days = getDaysOfCalendarMonth(this.state.date)

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
    if (!this.state.date) {
      return null;
    }

    const { weekDays, headerTextStyles } = this.props;
    return (
      <View style={styles.calendarContainer}>
        <CalendarHeader
          weekDays={weekDays}
          textStyles={headerTextStyles}
        />
        {this.renderWeekCalendar()}
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
}
MonthView.defaultProps = {
  date: new Date(),
  weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  headerTextStyles: {},
  dayTextStyles: {},
}

export default MonthView