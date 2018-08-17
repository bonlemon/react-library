import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment';

import { Input, } from '@library/components';
import { MonthCalendar } from '../calendar';

import './monthpicker.scss';

export default class MonthPicker extends Component {
    constructor(props) {
        super(props)
        this.monthPickerRef = React.createRef();
        // this.monthPicker = null;
        // this.setMonthPicker = element => {
        //     this.monthPicker = element
        // }
    }

    state = {
        isOpen: false,
        year: null,
        month: null,
        monthName: null,
        displayData: null,
    }

    static propTypes = {
        size: PropTypes.string,
        showClear: PropTypes.bool,
        showDefault: PropTypes.bool,
        format: PropTypes.object,
    }

    static defaultProps = {
        showClear: false,
        format: {},
    }

    componentDidMount() {
        this.setDefaultDate();
    }

    componentDidUpdate(pP, pS) {
        if (!this.state.isOpen) {
            document.removeEventListener('click', this.handleClickOutside);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    getDefaultDate() {
        return {
            year: moment().year(),
            month: moment().month(),
            monthName: moment().format('MMMM')
        }
    }

    setDefaultDate() {
        const { showDefault } = this.props;
        const current = this.getDefaultDate();
        this.setState({
            year: current.year,
            month: current.month,
            monthName: current.monthName,
            displayData: showDefault ? `${current.monthName} ${current.year}` : null
        });
    }

    handleInputClick = () => {
        this.setState(prevState => {
            if (!prevState.isOpen)
                return { isOpen: true }
        }, () => {
            document.addEventListener('click', this.handleClickOutside);
            if(!this.state.month && !this.state.year) {
                this.setDefaultDate();
            }
        });
    }

    handleGetCalendarValue = value => {
        const displayData = `${value.monthName} ${value.year}`;
        this.setState({
            year: value.year,
            month: value.month,
            monthName: value.monthName,
            displayData,
            isOpen: false,
        }, () => this.handleOnGetPickerData());
    }

    handleOnGetPickerData() {
        const { onGetPickerData, format: { year: yearFormat } } = this.props;
        const { month, year } = this.state;
        if (month !== undefined && year) {
            const frmYear = yearFormat ? moment().year(year).format(yearFormat) : year;
            onGetPickerData({ month, year: frmYear });
        }
    }

    handleClickOutside = (e) => {
        const { target } = e;
        if (!this.monthPickerRef.current.contains(target)) {
            this.setState({ isOpen: false })
        }
    }

    handlePickerClear = () => {
        const { onGetPickerData } = this.props;

        this.setState({
            year: null,
            month: null,
            monthName: null,
            displayData: null,
            isOpen: false,
        }, () => onGetPickerData({ month: null, year: null }));

    }


    render() {
        const { isOpen, month, year, displayData } = this.state;
        const { showClear, size, placeholder } = this.props;
        return (
            <div className='month-picker' ref={this.monthPickerRef}>
                <Input
                    className="month-picker__header"
                    size={size}
                    readOnly
                    placeholder={placeholder}
                    onClick={this.handleInputClick}
                    value={displayData} />
                {isOpen && (
                    <div className="month-picker__calendar">
                        <MonthCalendar
                            calendarMode='month'
                            month={month}
                            year={year}
                            activeDate={{month, year}}
                            onGetCalendarValue={this.handleGetCalendarValue}
                            showClear={showClear}
                            onPickerClear={this.handlePickerClear}
                        />
                    </div>
                )}
            </div>
        )
    }
}
