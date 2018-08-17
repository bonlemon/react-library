import React from 'react';
import PropTypes from 'prop-types';

import HeaderButton from './header-button';

import './calendar-header.scss';


export default class CalendarHeader extends React.PureComponent {

    static propTypes = {
        month: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        displayedDate: PropTypes.string,
        onChange: PropTypes.func,
        onClickPrevMonth: PropTypes.func,
        onClickNextMonth: PropTypes.func,
    }

    static defaultProps = {
        onChange: () => {},
        onClickPrevMonth: () => {},
        onClickNextMonth: () => {},
    }

    render() {
        const { onClickPrevMonth, onClickNextMonth, displayedDate } = this.props;

        return (
            <div className='datepicker-calendar-header'>
                <HeaderButton type='prev' onClick={onClickPrevMonth} />
                <span className='datepicker-calendar-header__value'>
                    {displayedDate}
                </span>
                <HeaderButton type='next' onClick={onClickNextMonth} />
            </div>
        )
    }
}
