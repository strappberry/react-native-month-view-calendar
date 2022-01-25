import React from 'react';
import CalendarRow from './calendarRow';
import { StyleSheet, Text, View } from 'react-native';

interface CalendarHeaderProps {
    weekDays: string[];
    textStyles: {};
}

class CalendarHeader extends React.Component<CalendarHeaderProps> {
    static defaultProps: { textStyles: {}; };

    render() {
        const { weekDays, textStyles } = this.props;

        return (
            <CalendarRow>
                {weekDays.map((label: string, index: number) => (
                    <View key={`${index}`} style={[styles.column]}>
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

  export default CalendarHeader;