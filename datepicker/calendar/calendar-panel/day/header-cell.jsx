import React from 'react';
import PropTypes from 'prop-types';

export default class CalendarHeaderCell extends React.PureComponent {

    static propTypes = {
        value: PropTypes.string
    }

    render() {
        return (
            <span className="b-calendar-panel-day__day-of-week">
                {this.props.value}
            </span>
        );
    }
}