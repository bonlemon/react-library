import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MonthTable from '../month-table';


export default class MonthPanel extends Component {
    static propTypes = {

    }

    render() {
        const { onChange, ...rest } = this.props;
        return (
            <div className="month-calendar__month-panel">
                <MonthTable
                    onChange={onChange}
                    {...rest}
                />
            </div>
        )
    }
}
