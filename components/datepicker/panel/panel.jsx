import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '../month-table';

import './panel.scss'

export default class Panel extends Component {
    static propTypes = {

    }

    render() {
        const { onChange, ...rest } = this.props;
        return (
            <div className='month-calendar__month-panel'>
                <Table
                    onChange={onChange}
                    {...rest}
                />
            </div>
        )
    }
}
