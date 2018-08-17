import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeaderButton from './header-button';

import './month-calendar-header.scss';

export default class MonthCalendarHeader extends Component {
    state = {
        currentMode: null,
        year: this.props.year,
    }

    static propTypes = {
        mode: PropTypes.string,
        year: PropTypes.number,
        onChange: PropTypes.func,
    }

    async componentDidMount() {
        const headerMode = await this.getHeaderMode();
        if (headerMode && this.state[headerMode] !== this.props[headerMode]) {
            this.setState({
                [headerMode]: this.props[headerMode]
            })
        }
    }

    getHeaderMode() {
        const { mode } = this.props;
        let headerMode;
        switch (mode) {
            default:
            case 'month':
                headerMode = 'year';
                this.setState({ currentMode: headerMode });
                return headerMode;
            case 'year':
                headerMode = 'decade';
                this.setState({ currentMode: headerMode });
                return headerMode;
            case 'days':
                headerMode = 'month';
                this.setState({ currentMode: headerMode });
                return headerMode;
        }
    }

    prevValue = () => {
        const { onChange } = this.props;
        const { currentMode } = this.state;
        this.setState({
            [currentMode]: this.state[currentMode] - 1
        }, () => onChange({ key: currentMode, value: this.state[currentMode] }))
    }

    nextValue = () => {
        const { onChange } = this.props;
        const { currentMode } = this.state;
        this.setState({
            [currentMode]: this.state[currentMode] + 1
        }, () => onChange({ key: currentMode, value: this.state[currentMode] }))
    }

    render() {
        const { currentMode } = this.state;
        return (
            <div className="calendar-header">
                <HeaderButton type='prev' onClick={this.prevValue} />
                <span className="calendar-header__value">
                    {this.state[currentMode]}
                </span>
                <HeaderButton type='next' onClick={this.nextValue} />
            </div>
        )
    }
}
