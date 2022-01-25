import React from 'react';
interface CalendarHeaderProps {
    weekDays: string[];
    textStyles: {};
}
declare class CalendarHeader extends React.Component<CalendarHeaderProps> {
    static defaultProps: {
        textStyles: {};
    };
    render(): JSX.Element;
}
export default CalendarHeader;
//# sourceMappingURL=calendarHeader.d.ts.map