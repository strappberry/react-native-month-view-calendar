import React from 'react';
interface CalendarRowProps {
    children: React.ReactNode;
    borderColor: string;
}
declare class CalendarRow extends React.Component<CalendarRowProps> {
    static defaultProps: {
        borderColor: string;
    };
    render(): JSX.Element;
}
export default CalendarRow;
//# sourceMappingURL=calendarRow.d.ts.map