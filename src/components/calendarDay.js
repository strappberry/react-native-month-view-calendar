import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

const CalendarDay = ({ index, date, renderEvent, events, textStyles }) => {
  const cellStyles = [
    styles.cell,
  ]

  if (index == 0) {
    cellStyles.push(styles.leftBorder)
  }

  return (
    <View style={cellStyles}>
      <Text style={[styles.text, textStyles]}>
        {date.getDate()}
      </Text>
      {events.map(renderEvent)}
    </View>
  )
}

CalendarDay.propTypes = {
  index: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date),
  renderEvent: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  textStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
}

CalendarDay.defaultProps = {
  textStyles: {},
}

const styles = {
  cell: {
    width: '14.2857142857%',
    borderColor: '#CCCCCC',
    borderRightWidth: 1,
    minHeight: 65,
    paddingTop: 3,
    paddingHorizontal: 1.5,
  },
  leftBorder: {
    borderLeftWidth: 1,
  },
  text: {
    textAlign: 'center',
  }
}

export default CalendarDay
