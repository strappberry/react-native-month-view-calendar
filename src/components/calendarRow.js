import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

const CalendarRow = ({ children, borderColor }) => {
  return (
    <View style={styles.row(borderColor)}>
      {children}
    </View>
  )
}

CalendarRow.propTypes = {
  borderColor: PropTypes.string,
}
CalendarRow.defaultProps = {
  borderColor: '#CCCCCC',
}

const styles = StyleSheet.create({
  row: (borderColor) => ({
    flexDirection: 'row',
    borderColor: borderColor,
    borderBottomWidth: 1,
    width: '100%',
  }),
})

export default CalendarRow
