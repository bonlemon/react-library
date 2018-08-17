import React, { Component } from 'react';
import PropTypes from 'prop-types';

import joinClasses from 'classnames';

import moment from 'moment';

import './month-table.scss';

export default class MonthTable extends Component {
    constructor(props) {
        super(props);

        this.ROWS = 4
        this.COLS = 3
    }

    state = {
        activeMonthNumber: this.props.month + 1,
        year: this.props.year,
    }
    
    static propTypes = {
        activeDate: PropTypes.shape({
          month: PropTypes.number,
          year: PropTypes.number,
        }),
        mode: PropTypes.string,
        month: PropTypes.number,
        year: PropTypes.number,
        onChange: PropTypes.func,

    }

    getMonthName(monthNumber) {
        moment.locale('ru')
        return moment().month(monthNumber).format('MMMM');
    }

    getMonths() {
        const months = [];
        let monthIndex = 0;
        for (let rowIndex = 0; rowIndex < this.ROWS; rowIndex++) {
            months[rowIndex] = [];
            for (let colIndex = 0; colIndex < this.COLS; colIndex++) {
                months[rowIndex][colIndex] = {
                    monthNumber: monthIndex + 1,
                    momentMonthNumber: monthIndex,
                    quarter: rowIndex + 1,
                    monthCaption: this.getMonthName(monthIndex)
                }
                monthIndex++;
            }
        }
        return months;
    }

    handleSelectMonth = (event) => {
        const target = event.target;
        const {onChange} = this.props;
        const monthNumber = Number(target.dataset.month);
        this.setState({
            activeMonthNumber: monthNumber,
            activeMonthName: this.getMonthName(monthNumber)
        }, () => onChange({value: this.state}))
    }

    isActiveMonth(month) {
        const {activeDate: {year: activeYear, month: activeMonth}} = this.props;
        return (month === activeMonth && this.props.year === activeYear)
    }

    getMonthClasses(monthNumber) {
        return joinClasses(
            'month-calendar__month',
            {'month-calendar__month--active': this.isActiveMonth(monthNumber)}
        )
    }

    render() {
        const months = this.getMonths();
        return (
            <div className="month-calendar__month-table">
                {
                    months.map((quarter, index) => {
                        return <div className="month-calendar__quarter" key={index}>
                            {
                                quarter.map((month) => {
                                    return (
                                        <div className={this.getMonthClasses(month.momentMonthNumber)}
                                            key={`${month.year}_${month.monthNumber}`}
                                            onClick={this.handleSelectMonth}
                                            data-month={month.momentMonthNumber}>
                                            {
                                                month.monthCaption
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}

