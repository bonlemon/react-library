import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './input.scss'


export default class DatePickerInput extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.shape({
            day: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            month: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            year: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            hour: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            minutes: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        }),
        size: PropTypes.oneOf([
            'small',
            'default',
            'large',
        ]),
        // bool
        isRequired: PropTypes.bool,
        withTime: PropTypes.bool,
        // func
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onEnter: PropTypes.func,
    }

    static defaultProps = {
        isRequired: false,
        withTime: false,
        size: 'default',
    }

    state = {
        isValid: false,
        isFocused: false
    }

    constructor(props) {
        super(props);

        this.day = React.createRef();
        this.month = React.createRef();
        this.year = React.createRef();
        this.hour = React.createRef();
        this.minute = React.createRef();
    }

    getComponentClassNames() {
        const { className, isRequired, size } = this.props;
        const { isValid, isFocused } = this.state;

        const status = isValid ? 'checked' : 'required';

        return {
            wrapper: classNames(
                className ? className : '',
                'datepicker-input-wrapper',
            ),
            component: classNames(
                'datepicker-input',
                size ? `datepicker-input--${size}` : '',
            ),
            input: classNames(
                'datepicker-input__elem',
                isRequired && !isFocused ? `datepicker-input__elem--${status}` : '',
                isFocused ? `datepicker-input__elem--focused` : ''
            ),
            field: classNames(
                'datepicker-input__field',
                size ? `datepicker-input__field--${size}` : '',
            ),
            fieldYear: classNames(
                'datepicker-input__field--year',
                size ? `datepicker-input__field--${size}` : '',
            ),
            iconDate: classNames(
                'datepicker-input__calendar-icon',
                size ? `datepicker-input__calendar-icon--${size}` : '',
            ),
            icon: classNames(
                'datepicker-input__icon',
                isRequired && !isFocused ? `datepicker-input__icon--${status}` : '',
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value != this.props.value) {
            const isValid = this.checkIsValid(this.props.value);

            this.setState({ isValid })
        }
    }

    handlerOnChange = (event, dateObject) => {
        const { onChange } = this.props;

        onChange ? onChange({ event, dateObject }) : null;
    }

    handlerOnChangeDay = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        `${newValue}`.length == 2 && this.month.current.focus();

        this.handlerOnChange(event, { ...this.props.value, date: newValue > 31 ? 31 : newValue })
    }

    handlerOnChangeMonth = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        `${newValue}`.length == 2 && this.year.current.focus();

        this.handlerOnChange(event, { ...this.props.value, month: newValue > 12 ? 12 : newValue })
    }

    handlerOnChangeYear = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        // Checking of this.hour.current need because may be don't pass withTime prop
        `${newValue}`.length >= 4 && this.hour.current && this.hour.current.focus();

        this.handlerOnChange(event, { ...this.props.value, year: newValue > 9999 ? 9999 : newValue })
    }

    handlerOnChangeHour = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        `${newValue}`.length == 2 && this.minute.current.focus();

        this.handlerOnChange(event, { ...this.props.value, hour: newValue > 23 ? 23 : newValue })
    }

    handlerOnChangeMinute = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        this.handlerOnChange(event, { ...this.props.value, minute: newValue > 59 ? 59 : newValue })
    }

    handlerOnKeyDownMonth = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        event.key === 'Backspace' && !newValue && this.day.current.focus();
    }

    handlerOnKeyDownYear = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        event.key === 'Backspace' && !newValue && this.month.current.focus();
    }

    handlerOnKeyDownHour = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        event.key === 'Backspace' && !newValue && this.year.current.focus();
    }

    handlerOnKeyDownMinute = (event) => {
        let newValue = Number(event.target.value.replace(/[^0-9]/gim, ''));

        event.key === 'Backspace' && !newValue && this.hour.current.focus();
    }

    handlerOnBlur = (event, dateObject) => {
        const { onBlur } = this.props;

        const isValid = this.checkIsValid(dateObject);

        this.setState({ isFocused: false, isValid })

        onBlur ? onBlur({ event, dateObject }) : null;
    }

    handlerOnBlurDay = (event) => {
        let newValue = event.target.value;

        let newDay;
        newDay = newValue < 1 ? 1 : newValue
        newDay = newValue == 0 ? '' : newValue

        this.handlerOnBlur(event, {
            ...this.props.value,
            date: newDay
        })
    }

    handlerOnBlurMonth = (event) => {
        let newValue = event.target.value;

        let newMonth;
        newMonth = newValue < 1 ? 1 : newValue
        newMonth = newValue == 0 ? '' : newValue

        this.handlerOnBlur(event, {
            ...this.props.value,
            month: newMonth
        })
    }

    handlerOnBlurYear = (event) => {
        let newValue = event.target.value;

        let newYear;
        newYear = newValue < 1800 ? newValue : 1800
        newYear = newValue == 0 ? '' : newValue

        this.handlerOnBlur(event, {
            ...this.props.value,
            year: newYear
        })
    }

    handlerOnBlurHour = (event) => {
        this.handlerOnBlur(event, {
            ...this.props.value,
            hour: Number(event.target.value) || ''
        })
    }

    handlerOnBlurMinute = (event) => {
        this.handlerOnBlur(event, {
            ...this.props.value,
            minute: Number(event.target.value) || ''
        })
    }

    handlerOnClickInput = (event) => {
        !this.state.isFocused && this.day.current.focus()
    }

    handlerOnFocus = (event) => {
        const { id, onFocus } = this.props;
        const { value, isValid } = this.state;

        this.setState({ isFocused: true })

        onFocus ? onFocus({ event, id, value, isValid }) : null;
    }

    handlerOnEnter = (event) => {
        const { id, onEnter } = this.props;
        const { isValid, value } = this.state;

        onEnter ? onEnter({ event, id, value, isValid }) : null;
    }

    addPrefixForValue(value, count) {
        // Transformation to string needs because value may be a number or string.
        let result = new String(value);

        if (value || value === 0) {
            while (result.length < count) {
                result = `0${result}`
            }
        } else {
            while (result.length < count) {
                result = `_${result}`
            }
        }
        return result
    }

    checkIsValid({ date, month, year }) {
        return Boolean(Number(date) && Number(month) && Number(year));
    }


    render() {
        const {
            id,
            value,
            withTime,
            label,
            isRequired,
        } = this.props;

        const classes = this.getComponentClassNames();

        return (
            <div className={classes.wrapper}>
                {label && <p className='datepicker-input-wrapper__label'>{label}</p>}
                <div className={classes.component}>
                    <div className={classes.input} onClick={this.handlerOnClickInput}>
                        <div className='datepicker-input__date'>
                            <span className={classes.iconDate}></span>
                            <input
                                id={id ? `${id}--day` : null} // id for puppeteer
                                className={classes.field}
                                type='text'
                                ref={this.day}
                                value={this.addPrefixForValue(value.date, 2)}
                                onFocus={this.handlerOnFocus}
                                onChange={this.handlerOnChangeDay}
                                onBlur={this.handlerOnBlurDay}
                            />
                            <span className='datepicker-input__field-divider'>/</span>
                            <input
                                id={id ? `${id}--month` : null} // id for puppeteer
                                className={classes.field}
                                type='text'
                                ref={this.month}
                                value={this.addPrefixForValue(value.month, 2)}
                                onFocus={this.handlerOnFocus}
                                onChange={this.handlerOnChangeMonth}
                                onBlur={this.handlerOnBlurMonth}
                                onKeyDown={this.handlerOnKeyDownMonth}
                            />
                            <span className='datepicker-input__field-divider'>/</span>
                            <input
                                id={id ? `${id}--year` : null}  // id for puppeteer
                                className={classes.fieldYear}
                                type='text'
                                ref={this.year}
                                value={this.addPrefixForValue(value.year, 4)}
                                onFocus={this.handlerOnFocus}
                                onChange={this.handlerOnChangeYear}
                                onBlur={this.handlerOnBlurYear}
                                onKeyDown={this.handlerOnKeyDownYear}
                            />
                        </div>
                        {
                            withTime &&
                            <div className='datepicker-input__time'>
                                <input
                                    id={id ? `${id}--hour` : null} // id for puppeteer
                                    className={classes.field}
                                    type='text'
                                    ref={this.hour}
                                    value={this.addPrefixForValue(value.hour, 2)}
                                    onFocus={this.handlerOnFocus}
                                    onChange={this.handlerOnChangeHour}
                                    onBlur={this.handlerOnBlurHour}
                                    onKeyDown={this.handlerOnKeyDownHour}
                                />
                                <span className='datepicker-input__field-divider'>:</span>
                                <input
                                    id={id ? `${id}--minute` : null} // id for puppeteer
                                    className={classes.field}
                                    type='text'
                                    ref={this.minute}
                                    value={this.addPrefixForValue(value.minute, 2)}
                                    onFocus={this.handlerOnFocus}
                                    onChange={this.handlerOnChangeMinute}
                                    onBlur={this.handlerOnBlurMinute}
                                    onKeyDown={this.handlerOnKeyDownMinute}
                                />
                            </div>
                        }
                    </div>
                    {isRequired && <span className={classes.icon}></span>}
                </div>
            </div>
        );
    }
}