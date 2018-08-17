import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class CalendarCell extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string,
        day: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        month: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        year: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        checked: PropTypes.bool,
        inCurrentMonth: PropTypes.bool,
        onCellClick: PropTypes.func
    }

    static defaultProp = {
        onCellClick: () => { }
    }

    handlerOnClick = (event) => {
        this.props.onCellClick({
            date: event.target.getAttribute("data-day"),
            month: event.target.getAttribute("data-month"),
            year: event.target.getAttribute("data-year"),
        });
    }

    getClassName() {
        const { checked, inCurrentMonth } = this.props;

        return classNames(
            "b-calendar-panel-day__date",
            checked ? "b-calendar-panel-day__date--checked" : "",
            inCurrentMonth ? "b-calendar-panel-day__date--current" : ""
        );
    }

    render() {

        const { day, month, year } = this.props;

        return (
            <span
                data-day={day}
                data-month={month}
                data-year={year}
                className={this.getClassName()}
                onClick={this.handlerOnClick}
            >
                {day}
            </span>
        );
    }
}