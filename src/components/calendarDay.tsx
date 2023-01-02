import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Event } from '../contracts/event';

interface CalendarDayProps {
    index: number;
    date: Date,
    renderEvent: (value: Event, index: number, array: Event[]) => React.ReactNode;
    events: Event[];
    textStyles: {} | [];
    viewStyles: {} | [];
}

class CalendarDay extends React.Component<CalendarDayProps> {
  static defaultProps: { textStyles: {}; viewStyles: {}; };

  render() {
    const { index, date, renderEvent, events, textStyles } = this.props;
    const cellStyles: any[] = [styles.cell];
    if (index === 0) {
        cellStyles.push(styles.leftBorder);
    }

    if (Array.isArray(this.props.viewStyles)) {
        cellStyles.push(...this.props.viewStyles);
    } else {
        cellStyles.push(this.props.viewStyles);
    }

    return (
        <View style={cellStyles}>
            <Text style={[styles.text, textStyles]}>
                {date.getDate()}
            </Text>
            {events.map(renderEvent)}
        </View>
    );
  }
}

CalendarDay.defaultProps = {
    textStyles: {},
    viewStyles: {},
}

const styles = StyleSheet.create({
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
});

export default CalendarDay;