"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var CalendarDay = /** @class */ (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarDay.prototype.render = function () {
        var _a = this.props, index = _a.index, date = _a.date, renderEvent = _a.renderEvent, events = _a.events, textStyles = _a.textStyles;
        var cellStyles = [styles.cell];
        if (index === 0) {
            cellStyles.push(styles.leftBorder);
        }
        if (Array.isArray(this.props.viewStyles)) {
            cellStyles.push.apply(cellStyles, this.props.viewStyles);
        }
        else {
            cellStyles.push(this.props.viewStyles);
        }
        return (react_1.default.createElement(react_native_1.View, { style: cellStyles },
            react_1.default.createElement(react_native_1.Text, { style: [styles.text, textStyles] }, date.getDate()),
            events.map(renderEvent)));
    };
    return CalendarDay;
}(react_1.default.Component));
CalendarDay.defaultProps = {
    textStyles: {},
    viewStyles: {},
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = CalendarDay;
//# sourceMappingURL=calendarDay.js.map