import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MonthCalendarHeader from './calendar-header';
import CalendarPanel from './calendar-panel';

import moment from 'moment';

import './month-calendar.scss';

export default class MonthCalendar extends PureComponent {
    constructor(props) {
        super(props)

        moment.locale('ru');
    }

    state = {
        mode: this.props.calendarMode,
        year: this.props.year,
        month: this.props.month,
        monthName: null,
    }

    static propTypes = {
        activeDate: PropTypes.shape({
            month: PropTypes.number,
            year: PropTypes.number,
        }),
        month: PropTypes.number,
        year: PropTypes.number,
        showClear: PropTypes.bool,
        calendarMode: PropTypes.oneOf(['date', 'month', 'year', 'decade']),
        onGetCalendarValue: PropTypes.func,
        onPickerClear: PropTypes.func,
    }

    static defaultProps = {
        calendarMode: 'month',
        onGetCalendarValue: () => {}
    }

    componentWillReceiveProps(nP) {
        if (this.state.month !== nP.month && this.state.year !== nP.year) {
            this.setState({ year: nP.year, month: nP.month })
        }
    }

    //Передать выше
    handleChangeMode = ({ mode }) => {
        this.setState({ mode })
    }

    handleChangeHeader = ({ key, value }) => {
        this.setState({
            [key]: value
        });
    }

    handleChangePanel = ({ value }) => {
        this.setState({
            month: value.activeMonthNumber,
            monthName: value.activeMonthName
        }, () => this.handleReturnCalendarValues())
    }

    handleReturnCalendarValues() {
        const { onGetCalendarValue } = this.props;
        onGetCalendarValue(this.state)
    }

    handleClearSelectedDate = () => {
        const { onPickerClear } = this.props;
        onPickerClear();
    }

    render() {
        const { mode, month, monthName, year } = this.state;
        const { showClear, activeDate } = this.props;

        return (
            <div className="month-calendar__container">
                <MonthCalendarHeader
                    mode={mode}
                    onChange={this.handleChangeHeader}
                    year={year}
                />
                <CalendarPanel
                    mode={mode}
                    onChange={this.handleChangePanel}
                    month={month}
                    year={year}
                    activeDate={activeDate}
                />
                {
                    showClear && <span className="month-calendar__container__clear"
                        onClick={this.handleClearSelectedDate}> Очистить </span>
                }
            </div>
        )
    }
}
