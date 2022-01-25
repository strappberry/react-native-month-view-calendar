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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var calendarHeader_1 = __importDefault(require("./components/calendarHeader"));
var calendarRow_1 = __importDefault(require("./components/calendarRow"));
var calendarDay_1 = __importDefault(require("./components/calendarDay"));
var weekDaysLengthError_1 = __importDefault(require("./errors/weekDaysLengthError"));
var utils_1 = require("./utils");
var MonthViewCalendar = /** @class */ (function (_super) {
    __extends(MonthViewCalendar, _super);
    function MonthViewCalendar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentDate: null,
            datesList: [],
        };
        /**
         * Calculate initial array of dates
         */
        _this.calculateInitialDates = function (date) {
            var initialDates = [];
            for (var i = -_this.pageOffset; i <= _this.pageOffset; i += 1) {
                var centralDate = new Date(date);
                centralDate.setMonth(centralDate.getMonth() + i);
                initialDates.push(centralDate);
            }
            _this.state.datesList = initialDates;
        };
        /**
         * Add new dates to dateList by referencing
         */
        _this.appendPagesInPlace = function (datesList, nPages) {
            var latest = datesList[datesList.length - 1];
            for (var i = 1; i <= nPages; i += 1) {
                var newDate = new Date(latest);
                newDate.setMonth(newDate.getMonth() + i);
                datesList.push(newDate);
            }
        };
        /**
         * Prepend new dates to dateList by referencing
         */
        _this.prependPagesInPlace = function (datesList, nPages) {
            var first = datesList[0];
            for (var i = 1; i <= nPages; i += 1) {
                var newDate = new Date(first);
                newDate.setMonth(newDate.getMonth() - i);
                datesList.unshift(newDate);
            }
        };
        /**
         * Return date object of the month that is being shown
         */
        _this.getCurrentDate = function () {
            return _this.state.datesList[_this.currentPageIndex];
        };
        /**
         * Change month that is being shown
         */
        _this.goToDate = function (date, animated) {
            if (animated === void 0) { animated = true; }
            if (!_this.monthVirtualList) {
                return;
            }
            var currentDate = _this.state.datesList[_this.currentPageIndex];
            if (currentDate.getMonth() == date.getMonth()
                && currentDate.getFullYear() == date.getFullYear()) {
                return;
            }
            var index = _this.state.datesList.findIndex(function (item) {
                return item.getMonth() == date.getMonth()
                    && item.getFullYear() == date.getFullYear();
            });
            _this.scrollTo(index, animated);
        };
        /**
         * Move scroll of virtualized list of months to specific index
         */
        _this.scrollTo = function (index, animated) {
            if (animated === void 0) { animated = true; }
            if (_this.monthVirtualList) {
                _this.monthVirtualList.scrollToIndex({
                    index: index,
                    animated: animated,
                });
                _this.currentPageIndex = index;
            }
        };
        _this.scrollBegin = function (event) {
            _this.movingScroll = true;
        };
        _this.scrollEnd = function (event) {
            if (!_this.movingScroll)
                return;
            _this.movingScroll = false;
            var _a = event.nativeEvent, contentOffset = _a.contentOffset, contentSize = _a.contentSize;
            var position = contentOffset.x;
            var innerWidth = contentSize.width;
            var datesList = _this.state.datesList;
            var _b = _this.props, onSwipe = _b.onSwipe, onSwipePrev = _b.onSwipePrev, onSwipeNext = _b.onSwipeNext;
            var previousIndex = Number(_this.currentPageIndex);
            var newIndex = Math.round((position / innerWidth) * datesList.length);
            var movedPages = newIndex - _this.currentPageIndex;
            _this.currentPageIndex = newIndex;
            var newDate = datesList[_this.currentPageIndex];
            var newState = {
                currentDate: newDate,
            };
            var newStateCallback = function () { };
            if (movedPages < 0 && newIndex < _this.pageOffset) {
                _this.prependPagesInPlace(datesList, 1);
                _this.currentPageIndex += 1;
                newState.datesList = __spreadArray([], datesList, true);
                var scrollToCurrentIndex_1 = function () {
                    var _a;
                    return (_a = _this.monthVirtualList) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
                        index: _this.currentPageIndex,
                        animated: false,
                    });
                };
                newStateCallback = function () { return setTimeout(scrollToCurrentIndex_1, 0); };
            }
            else if (movedPages > 0 &&
                newIndex >= _this.state.datesList.length - _this.pageOffset) {
                _this.appendPagesInPlace(datesList, 1);
                newState.datesList = __spreadArray([], datesList, true);
            }
            _this.setState(newState, newStateCallback);
            previousIndex != newIndex && onSwipe && onSwipe(datesList[_this.currentPageIndex]);
            if (newIndex > previousIndex) {
                onSwipeNext && onSwipeNext(datesList[_this.currentPageIndex]);
            }
            else if (newIndex < previousIndex) {
                onSwipePrev && onSwipePrev(datesList[_this.currentPageIndex]);
            }
        };
        _this.setRefOfMonthVirtualList = function (ref) {
            _this.monthVirtualList = ref;
        };
        _this.pageOffset = 2;
        _this.currentPageIndex = _this.pageOffset;
        _this.eventsGridScrollX = new react_native_1.Animated.Value(0);
        _this.movingScroll = false;
        if (props.weekDays.length != 7) {
            throw new weekDaysLengthError_1.default(props.weekDays.length.toString());
        }
        _this.state.currentDate = props.date;
        _this.calculateInitialDates(_this.props.date);
        return _this;
    }
    MonthViewCalendar.prototype.renderWeekCalendar = function (date) {
        var _this = this;
        var days = (0, utils_1.getDaysOfCalendarMonth)(date);
        return days.map(function (week, i) { return (react_1.default.createElement(calendarRow_1.default, { key: "week-".concat(i) }, week.map(function (day, j) {
            var eventsOfDay = (0, utils_1.findEventsForTheDay)(day, _this.props.events);
            return (react_1.default.createElement(calendarDay_1.default, { key: j, index: j, date: day, events: eventsOfDay, renderEvent: _this.props.renderEvent, textStyles: _this.props.dayTextStyles }));
        }))); });
    };
    MonthViewCalendar.prototype.render = function () {
        var _this = this;
        var _a = this.props, weekDays = _a.weekDays, headerTextStyles = _a.headerTextStyles;
        return (react_1.default.createElement(react_native_1.View, { style: styles.calendarContainer },
            react_1.default.createElement(react_native_1.VirtualizedList, { ref: this.setRefOfMonthVirtualList, keyExtractor: function (item) { return item; }, data: this.state.datesList, getItemCount: function (data) { return data.length; }, getItem: function (data, index) { return data[index]; }, initialScrollIndex: this.pageOffset, horizontal: true, renderItem: function (_a) {
                    var item = _a.item;
                    return (react_1.default.createElement(react_native_1.View, { style: { width: utils_1.CONTAINER_WIDTH } },
                        react_1.default.createElement(calendarHeader_1.default, { weekDays: weekDays, textStyles: headerTextStyles }),
                        _this.renderWeekCalendar(item)));
                }, pagingEnabled: true, onMomentumScrollBegin: this.scrollBegin, onMomentumScrollEnd: this.scrollEnd, scrollEventThrottle: 32, onScroll: react_native_1.Animated.event([
                    {
                        nativeEvent: {
                            contentOffset: {
                                x: this.eventsGridScrollX,
                            },
                        },
                    },
                ], { useNativeDriver: false }), onScrollToIndexFailed: this.props.onScrollToIndexFailed, showsHorizontalScrollIndicator: false })));
    };
    return MonthViewCalendar;
}(react_1.default.Component));
MonthViewCalendar.defaultProps = {
    date: new Date(),
    weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    headerTextStyles: {},
    dayTextStyles: {},
};
var styles = react_native_1.StyleSheet.create({
    calendarContainer: {
        minHeight: 300,
        width: '100%',
    },
});
exports.default = MonthViewCalendar;
//# sourceMappingURL=index.js.map