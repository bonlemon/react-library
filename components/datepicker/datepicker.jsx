import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment';
import joinClasses from 'classnames';
import DatePickerInput from './input';
import Calendar from './calendar';

import { getScrollHeight } from '@library/foundation/helpers/scroll';
import getCalendarGrid from './calendar-grid-generator'

import './datepicker.scss';



export default class DatePicker extends React.PureComponent {

    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        label: PropTypes.string,
        size: PropTypes.oneOf([
            'small',
            'default',
            'large',
        ]),
        // bool
        withTime: PropTypes.bool,
        isRequired: PropTypes.bool,
        // func
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onEnter: PropTypes.func,
    }

    static defaultProps = {
        size: 'default',
        withTime: false,
        isRequired: false,
    }

    constructor(props) {
        super(props);

        this.datePickerRef = React.createRef();

        this.state = {
            date: '',
            month: '',
            year: '',
            hour: '',
            minute: '',
            displayedDate: '',
            isOpened: false,
            openToTop: false,
        }
    }

    componentDidMount() {
        moment.locale('ru');

        const { value } = this.props;

        if (value) {
            const newState = this.getObjectFromMoment(value);

            this.setState(newState)
        }
    }

    getObjectFromMoment(value) {
        const date = moment(value, 'x');

        return {
            date: date.date(),
            month: date.month() + 1,
            year: date.year(),
            hour: date.hour(),
            minute: date.minute(),
            displayedDate: date.format('MMMM YYYY')
        }
    }

    setDefaultDate() {
        this.setState({
            date: null,
            month: null,
            year: null,
            hour: null,
            minute: null,
            displayedDate: null,
            isOpened: false,
            openToTop: false,
        })
    }

    handlerOnChange = ({ event, dateObject }) => {

        const { id, onChange } = this.props;

        const newMoment = moment({
            ...dateObject,
            month: dateObject.month - 1
        });
        const displayedDate = newMoment.isValid() ? newMoment.format('MMMM YYYY') : '';
        const timestamp = newMoment.isValid() ? newMoment.format('x') : null;

        this.setState({
            ...dateObject,
            displayedDate
        });

        onChange ? onChange({ event, id, timestamp }) : null;
    }

    handlerOnBlur = ({ event, dateObject }) => {
        const { id, onBlur } = this.props;

        const newMoment = moment({
            ...dateObject,
            month: dateObject.month - 1
        });
        const displayedDate = newMoment.isValid() ? newMoment.format('MMMM YYYY') : '';
        const timestamp = newMoment.isValid() ? newMoment.format('x') : null;

        this.setState({
            ...dateObject,
            displayedDate
        });

        onBlur ? onBlur({ event, id, timestamp }) : null;
    }

    handlerOnEnter = (event) => {
        const { id, onEnter } = this.props;
        const { isValid, value } = this.state;

        onEnter ? onEnter({ event, id, value, isValid }) : null;
    }

    handleInputClick = (e) => {
        const scrollHeight = getScrollHeight();

        const coordinates = e.target.getBoundingClientRect();

        if (scrollHeight - coordinates.bottom <= 270) {
            this.setState({ openToTop: true })
        }

        this.setState(prevState => {
            if (!prevState.isOpened) {
                return { isOpened: true }
            }
        }, () => {
            document.addEventListener('click', this.handleClickOutside);
        });
    }

    handleClickOutside = (e) => {
        const { target } = e;
        if (!this.datePickerRef.current.contains(target)) {
            this.setState({
                isOpened: false,
                openToTop: false
            })
        }
    }

    handlerOnClickPrevMonth = () => {
        const prevMonth = this.getMomentFromState().subtract(1, 'month').format('x');

        this.setState(this.getObjectFromMoment(prevMonth));
    }
    handlerOnClickNextMonth = () => {
        const nextMonth = this.getMomentFromState().add(1, 'month').format('x');

        this.setState(this.getObjectFromMoment(nextMonth));
    }

    getMomentFromState() {
        const { date, month, year, hour, minute } = this.state;

        return moment({ date, month: month - 1, year, hour, minute })
    }

    getDateObject() {
        const { date, month, year, hour, minute } = this.state;

        return { date, month, year, hour, minute }
    }

    getDateObjectForCalendar() {
        const { displayedDate } = this.state;

        return { ...this.getDateObject(), displayedDate }
    }

    getClassNames() {
        const { openToTop } = this.state;

        return {
            calendar: joinClasses(
                'date-picker__calendar',
                openToTop ? `date-picker__calendar--top` : ''
            )
        }
    }


    render() {
        const { label, size, withTime, isRequired } = this.props;

        const classes = this.getClassNames();

        const dateObjectForCalendar = this.getDateObjectForCalendar()

        return (
            <div className='date-picker' onClick={this.handleInputClick} ref={this.datePickerRef} >
                <DatePickerInput
                    className='date-picker__header'
                    label={label}
                    size={size}
                    value={this.getDateObject()}
                    withTime={withTime}
                    isRequired={isRequired}
                    onChange={this.handlerOnChange}
                    onBlur={this.handlerOnBlur}
                    onEnter={this.handlerOnEnter}
                />
                {
                    this.state.isOpened &&
                    <Calendar
                        {...dateObjectForCalendar}
                        className={classes.calendar}
                        calendarGrid={getCalendarGrid(dateObjectForCalendar)}
                        onChange={this.handlerOnChange}
                        onClickPrevMonth={this.handlerOnClickPrevMonth}
                        onClickNextMonth={this.handlerOnClickNextMonth}
                    />
                }
            </div>
        )
    }
}