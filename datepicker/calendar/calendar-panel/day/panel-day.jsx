//** IMPORTS **//

// Lybraries
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import 'moment/locale/ru'  // need for change locate of moment js

// Components
import CalendarCell from './cell.jsx';
import CalendarHeaderCell from './header-cell.jsx';

// Styles
import './panel-day.scss';



export default class CalendalPanelDay extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string,
        handler: PropTypes.func,
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
        calendarGrid: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({
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
                })
            )
        ),
        timepicker: PropTypes.bool,
        className: PropTypes.string,
    }
    
    checkeCurrentDay({day, month, year}) {
        const {
            date: currnetDate,
            month: currnetMonth,
            year: currnetYear,
        } = this.props;

        return currnetDate == day && currnetMonth == month && currnetYear == year
    }

    getPropsForDate({day, month, year}) {
        const { handler, month: currentMonth } = this.props;

        return {
            handler, day, month, year,
            checked: this.checkeCurrentDay({day, month, year}),
            inCurrentMonth: currentMonth == month
        }
    }

    renderClendarPanelHeader = () => (
        <div className="b-calendar-panel-day__row">
            {
                ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((dayOfWeek, i) => (
                    <CalendarHeaderCell
                        key={i}
                        value={dayOfWeek}
                    />
                ))
            }
        </div>
    )

    renderClendarPanelBody = () => {
        return this.props.calendarGrid.map((week, weekIndex) => (
            <div key={weekIndex} className="b-calendar-panel-day__row">
                {
                    week.map((date, dateIndex) => (
                        date && <CalendarCell key={dateIndex} {...this.getPropsForDate(date)} />
                    ))
                }
            </div>
        ))
    }

    render() {
        return <div>
            {this.renderClendarPanelHeader()}
            {this.renderClendarPanelBody()}
        </div>
    }
}