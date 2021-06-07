import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import CalendarRow from './calendarRow'

class CalendarHeader extends Component {
  render() {
    const { textStyles, weekDays } = this.props;

    return (
      <CalendarRow>
      {weekDays.map((label, i) => (
        <View key={i} style={[styles.column]}>
          <Text
            style={[
              styles.text,
              textStyles,
            ]}
          >
            {label}
          </Text>
        </View>
      ))}
    </CalendarRow>
    );
  }
}

CalendarHeader.propTypes = {
  textStyles: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  weekDays: PropTypes.arrayOf(PropTypes.string).isRequired,
}

CalendarHeader.defaultProps = {
  textStyles: {},
}

const styles = StyleSheet.create({
  column: {
    width: '14.2857142857%',
    paddingVertical: 10,
  },
  text: {
    textAlign: 'center',
  },
})

export default CalendarHeader