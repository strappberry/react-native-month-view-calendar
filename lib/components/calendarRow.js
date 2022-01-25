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
var CalendarRow = /** @class */ (function (_super) {
    __extends(CalendarRow, _super);
    function CalendarRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRow.prototype.render = function () {
        return (react_1.default.createElement(react_native_1.View, { style: [styles.row, { borderColor: this.props.borderColor }] }, this.props.children));
    };
    return CalendarRow;
}(react_1.default.Component));
CalendarRow.defaultProps = {
    borderColor: '#CCCCCC',
};
var styles = react_native_1.StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        width: '100%',
    },
});
exports.default = CalendarRow;
//# sourceMappingURL=calendarRow.js.map