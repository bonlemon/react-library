import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CalendarHeader from './calendar-header';
import CalendarPanel from './calendar-panel';

import joinClasses from 'classnames';

import './calendar.scss';



export default class Calendar extends PureComponent {

    static propTypes = {
        date: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        year: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        month: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        day: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        // calendarGrid: PropTypes.arrayOf(
        //     PropTypes.arrayOf(
        //         PropTypes.shape({
        //             date: PropTypes.oneOfType([
        //                 PropTypes.number,
        //                 PropTypes.string,
        //             ]),
        //             year: PropTypes.oneOfType([
        //                 PropTypes.number,
        //                 PropTypes.string,
        //             ]),
        //             month: PropTypes.oneOfType([
        //                 PropTypes.number,
        //                 PropTypes.string,
        //             ]),
        //         })
        //     )
        // ),
        onClickPrevMonth: PropTypes.func,
        onClickNextMonth: PropTypes.func,
        displayedDate: PropTypes.string,
        className: PropTypes.string,

        // calendarMode: PropTypes.oneOf(['date', 'month', 'year', 'decade']),
    }

    static defaultProps = {
        onClickPrevMonth: () => { },
        onClickNextMonth: () => { },
    }

    getClassNames() {
        const { className } = this.props;

        return {
            component: joinClasses(
                'datepicker-calendar__container',
                className ? className : ''
            )
        }
    }

    render() {
        const {
            date,
            month,
            year,
            calendarGrid,
            onClickPrevMonth,
            onClickNextMonth,
            displayedDate
        } = this.props;

        const classes = this.getClassNames();

        return (
            <div className={classes.component}>
                <CalendarHeader
                    month={month}
                    displayedDate={displayedDate}
                    onChange={this.handleChangeHeader}
                    onClickPrevMonth={onClickPrevMonth}
                    onClickNextMonth={onClickNextMonth}
                />
                <CalendarPanel
                    date={date}
                    month={month}
                    year={year}
                    calendarGrid={calendarGrid}
                    onChange={this.handleChangePanel}
                // activeDate={activeDate}
                // mode={mode}
                />
            </div>
        )
    }
}
