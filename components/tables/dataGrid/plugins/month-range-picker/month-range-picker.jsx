import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import './month-range-picker.scss';

export default class MonthRangePicker extends PureComponent {
    constructor(props) {
        super(props)

        this.picker = React.createRef();
    }

    state = {
        beginMonth: null,
        beginYear: null,
        endMonth: null,
        endYear: null,
        raw_begin: '',
        raw_end: '',
        isOpen: false,
        displayText: 'Выбрать период...'
    }

    static propTypes = {
        isOpen: PropTypes.bool,
        onGetPickerData: PropTypes.func,
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

        if (!this.picker.current.contains(e.target)) {
            this.setState({ isOpen: false })
        }
    }


    handleChange = e => {
        const { target } = e;
        const q = target.name;
        const momentMonth = moment(target.value).get('month')
        const momentYear = moment(target.value).get('year');

        this.setState({
            [`${q}Month`]: momentMonth + 1,
            [`${q}Year`]: momentYear,
            [`raw_${q}`]: target.value,
        })
    }

    handleChangeDisplayText() {
        const { raw_begin, raw_end } = this.state;
        if (raw_begin && raw_end) {
            this.setState({ displayText: `${moment(raw_begin).format('MM.YYYY')} - ${moment(raw_end).format('MM.YYYY')}` })
        }
    }

    handleSavePickerForm = e => {
        e.preventDefault();
        const { beginMonth, beginYear, endMonth, endYear } = this.state;
        if (beginMonth && beginYear && endMonth && endYear) {
            const { onGetPickerData } = this.props;
            const frmtBeginYear = Number(String(beginYear).slice(2));
            const frmtEndYear = Number(String(endYear).slice(2));
            onGetPickerData({ beginMonth, beginYear: frmtBeginYear, endMonth, endYear: frmtEndYear });
            this.handleChangeDisplayText();
            this.setState({ isOpen: false }, () => this.handleClosePickerForm());
        }
    }

    handleClearPicker = e => {
        e.preventDefault();
        const { onGetPickerData } = this.props;
        this.setState({
            beginMonth: null,
            beginYear: null,
            endMonth: null,
            endYear: null,
            raw_begin: '',
            raw_end: '',
            isOpen: false,
            displayText: 'Выбрать период...',
        }, () => onGetPickerData({ beginMonth: null, beginYear: null, endMonth: null, endYear: null }));
    }

    canResetPicker() {
        const { beginMonth, beginYear, endMonth, endYear } = this.state;
        return Boolean(beginMonth && beginYear && endMonth && endYear);
    }

    render() {

        const { isOpen, displayText, raw_begin, raw_end } = this.state;

        return (
            <div className="month-range__container" ref={this.picker}>
                <div className="month-range-picker">
                    <span className="month-range-picker__show-form" onClick={this.handleOnClickPicker}>{displayText}</span>
                    {this.canResetPicker() && <span className="month-range-picker__clear" onClick={this.handleClearPicker}> X </span>}

                </div>
                {
                    isOpen && (
                        <div className="picker-form">
                            <input type="month" className="picker-form__input" name="begin" onChange={this.handleChange} value={raw_begin} />
                            <input type="month" className="picker-form__input" name="end" onChange={this.handleChange} value={raw_end} />
                            <a className="picker-form__save-button" onClick={this.handleSavePickerForm}>Применить фильтр</a>
                        </div>
                    )
                }

            </div>
        )
    }
}
