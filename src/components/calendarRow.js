import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

class CalendarRow extends Component {
  render() {
    return <View style={styles.row(this.props.borderColor)}>
      {this.props.children}
    </View>
  }
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
