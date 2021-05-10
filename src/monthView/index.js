import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { getDaysOfCalendarMonth, findEventsForTheDay } from '../utils'
import styles from '../styles'
import CalendarHeader from '../components/calendarHeader'
import CalendarRow from '../components/calendarRow'
import CalendarDay from '../components/calendarDay'
import { WeekDaysError } from '../errors/weekDaysError'

const MonthView = ({
  date,
  weekDays,
  events,
  headerTextStyles,
  dayTextStyles,
  renderEvent
}) => {
  if (weekDays.length != 7) {
    throw new WeekDaysError('The length of the weekDays array must be 7');
  }

  const renderWeekCalendar = () => {
    const days = getDaysOfCalendarMonth(date)

    return days.map((week, i) => (
      <CalendarRow key={`week-${i}`}>
        {week.map((day, j) => {
          const eventsOfDay = findEventsForTheDay(day, events)
          return (
            <CalendarDay
              key={j}
              index={j}
              date={day}
              events={eventsOfDay}
              renderEvent={renderEvent}
              textStyles={dayTextStyles}
            />
          )
        })}
      </CalendarRow>
    ))
  }

  return (
    <View style={styles.calendarContainer}>
      <CalendarHeader
        weekDays={weekDays}
        textStyles={headerTextStyles}
      />
      {renderWeekCalendar()}
    </View>
  )
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