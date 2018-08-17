import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MonthPanel from './month-panel';

export default class CalendarPanel extends Component {
    static propTypes = {
        mode: PropTypes.oneOf(['decade', 'year', 'month',]),
    }

    renderCurrentPanel({ mode }) {
        const {onChange, ...restProps} = this.props;
        switch (mode) {
            case 'month':
                return (
                    <MonthPanel onChange={this.props.onChange} {...restProps}/>
                )
        }
    }

    render() {
        const { mode } = this.props;
        return (
            <div className="calendar-panel">
                {this.renderCurrentPanel({ mode })}
            </div>
        )
    }
}
