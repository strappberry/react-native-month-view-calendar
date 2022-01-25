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
var calendarRow_1 = __importDefault(require("./calendarRow"));
var react_native_1 = require("react-native");
var CalendarHeader = /** @class */ (function (_super) {
    __extends(CalendarHeader, _super);
    function CalendarHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarHeader.prototype.render = function () {
        var _a = this.props, weekDays = _a.weekDays, textStyles = _a.textStyles;
        return (react_1.default.createElement(calendarRow_1.default, null, weekDays.map(function (label, index) { return (react_1.default.createElement(react_native_1.View, { key: "".concat(index), style: [styles.column] },
            react_1.default.createElement(react_native_1.Text, { style: [
                    styles.text,
                    textStyles,
                ] }, label))); })));
    };
    return CalendarHeader;
}(react_1.default.Component));
CalendarHeader.defaultProps = {
    textStyles: {},
};
var styles = react_native_1.StyleSheet.create({
    column: {
        width: '14.2857142857%',
        paddingVertical: 10,
    },
    text: {
        textAlign: 'center',
    },
});
exports.default = CalendarHeader;
//# sourceMappingURL=calendarHeader.js.map