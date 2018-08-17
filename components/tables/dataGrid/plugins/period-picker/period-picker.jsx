import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment';

import './period-picker.scss';

export default class PeriodPicker extends Component {
    constructor(props) {
        super(props)

        //this.picker = React.createRef(); //16.4
        this.picker = null;

        this.setPickerRef = element => {
            this.picker = element
        }
    }

    state = {
        begin: null,
        end: null,
        raw_begin: '',
        raw_end: '',
        isOpen: false,
        displayText: 'Выбрать период...'

    }
    static propTypes = {
        isOpen: PropTypes.bool,
        onGetDateRange: PropTypes.func,
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }


    handleOnClickPicker = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }), () => this.handleTogglePicker());
    }

    handleTogglePicker = () => {
        const { isOpen } = this.state;
        isOpen ? this.handleShowPickerForm() : this.handleClosePickerForm()
    }

    handleShowPickerForm = () => {
        document.addEventListener('click', this.handleClickOutside);

    }

    handleClosePickerForm = () => {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        
        if (!this.picker.contains(e.target)) {
            this.setState({ isOpen: false })
        }
    }

    convertDateToLong = rawDate => Number(moment(rawDate).format('x'));


    handleChange = e => {
        const { target } = e;
        this.setState({
            [`raw_${target.name}`]: target.value,
            [target.name]: this.convertDateToLong(target.value)
        })
    }

    handleChangeDisplayText() {
        const { raw_begin, raw_end } = this.state;
        if (raw_begin && raw_end) {
            this.setState({ displayText: `${moment(raw_begin).format('DD.MM.YYYY')} - ${moment(raw_end).format('DD.MM.YYYY')}` })
        }
    }

    handleSavePickerForm = e => {
        e.preventDefault();
        const { begin, end } = this.state;
        if (begin && end) {
            const { onGetDateRange } = this.props;
            onGetDateRange({ begin, end });
            this.handleChangeDisplayText();
            this.setState({ isOpen: false }, () => this.handleClosePickerForm())
        }
    }

    handleClearPicker = e => {
        e.preventDefault();
        const { onGetDateRange } = this.props;
        this.setState({
            begin: null,
            end: null,
            raw_begin: '',
            raw_end: '',
            isOpen: false,
            displayText: 'Выбрать период...'
        }, () => onGetDateRange({ begin: null, end: null }))
    }

    canResetPicker() {
        const {begin, end} = this.state;
        return Boolean(begin && end)
    }

    render() {
        const { isOpen, displayText, raw_begin, raw_end } = this.state;
        return (
            <div className="period-picker__container" ref={this.setPickerRef}>
                <div className="period-picker">
                    <span className="period-picker__show-form" onClick={this.handleOnClickPicker}>{displayText}</span>
                    {this.canResetPicker() && <span className="period-picker__clear" onClick={this.handleClearPicker}> X </span>}
                    
                </div>
                {
                    isOpen && (
                        <div className="picker-form">
                            <input type="date" className="picker-form__input" name="begin" onChange={this.handleChange} value={raw_begin} />
                            <input type="date" className="picker-form__input" name="end" onChange={this.handleChange} value={raw_end} />
                            <a className="picker-form__save-button" onClick={this.handleSavePickerForm}>Применить фильтр</a>
                        </div>
                    )
                }
            </div>
        )
    }
}
