import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import MonthCalendar from '@library/components/selectors/calendar/month-calendar';
import { MonthPicker } from '@library/components';
import DatePicker from '@library/components/datepicker';

import Layout from 'common/components/layouts/layout';
import Modal from 'common/components/blocks/modal';

import Spinner from '@library/components/indicators/spinner';

import './layouts-page.scss'

export default class LayoutsPage extends PureComponent {
    constructor(...args) {
        super(...args);
    }

    state = {
        period: null,
        showLock: false,
        value: moment().format('x')
    }

    handleOnChange = ({ event, id, timestamp }) => {

        console.log("event, id,value", { event, id, timestamp })
        this.setState({
            value: timestamp
        })

    }

    handleGetPeriod = period => {
        this.setState({ period })
    }

    handleGetMonth = pickerDate => {
        console.log(pickerDate);

        // const dataFromPicker = {
        //     month: Number(pickerDate.month),
        //     year: Number(pickerDate.year.toString().slice(2))
        // }
        // console.log(dataFromPicker);
    }

    showLockScreen = () => this.setState({ showLock: true })

    render() {

        return (
            <Fragment>
                <div className="container-fluid">
                    {/* <MonthCalendar onGetCalendarValue={this.handleGetPeriod}/> */}
                    <div className="relative-pos">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div><div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div><div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <DatePicker
                            id="testid"
                            label="awesome label"
                            value={this.state.value}
                            showClear={true}
                            withTime={true}
                            isRequired={true}
                            onChange={this.handleOnChange}
                        // onGetPickerData={this.handleGetMonth}
                        />

                        {/* <Layout type="overlay">
                            <Modal className="b-question-window__modal" type="half" >
                        <div style={{height: '100%'}}>

                            <div>5</div>
                        <div>6</div><div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>4</div>
                        <div>5</div>
                                <DatePicker
                                    id="testid"
                                    label="awesome label"
                                    value={this.state.value}
                                    showClear={true}
                                    withTime={true}
                                    isRequired={true}
                                    onChange={this.handleOnChange}
                                // onGetPickerData={this.handleGetMonth}
                                />
                        </div>

                </Modal>
            </Layout> */}

                {/* <MonthPicker showClear={true} onGetPickerData={this.handleGetMonth} /> */}

                    </div>
                    {/* <div>
                        <button onClick={this.showLockScreen}>Загрузить</button>
                    </div> */}

                </div >
            {/* <span>{this.state.period}</span> */ }
        {/* <Spinner  message="Remove application...."/> */ }

            </Fragment >
        )
    }
}
