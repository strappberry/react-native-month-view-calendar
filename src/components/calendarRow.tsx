import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CalendarRowProps {
    children: React.ReactNode;
    borderColor: string;
}

class CalendarRow extends React.Component <CalendarRowProps> {
    static defaultProps: { borderColor: string; };

    render() {
        return (
            <View
                style={[styles.row, { borderColor: this.props.borderColor }]}
            >
                {this.props.children}
            </View>
        );
    }
}

CalendarRow.defaultProps = {
    borderColor: '#CCCCCC',
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
    },
});

export default CalendarRow;