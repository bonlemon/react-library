import React from 'react';

import columnTypes from '../config/columnTypes';
import { Input } from '@library/components';
import DatePicker from 'library/inputs/datepicker';
import { MonthPicker } from '@library/components';
import PeriodPicker from './period-picker';
import MonthRangePicker from './month-range-picker';

/*eslint-disable react/display-name*/
export const filterRowPlugin = {
    getComponentByTypes: (columnProps) => {

        const {
            type, format = '', disabled,
            handleSaveTextFilter, handleChange, clearTextFilter,
            filterTerm, additionalProps = {} } = columnProps;
        switch (type) {
            default:
            case columnTypes.string.value:
                return (<Input
                    className="b-input--filter"
                    size="small"
                    type="text"
                    showClear
                    onChange={clearTextFilter}
                    onBlur={handleSaveTextFilter}
                    onEnter={handleChange}
                    disabled={disabled}
                />)

            case columnTypes.number.value:
                return (
                    <Input
                        className="b-input--filter"
                        size="small"
                        type="number"
                        onChange={handleChange}
                        disabled={disabled}
                    />
                )

            case columnTypes.date.value:
                return filterRowPlugin.dateFormater(columnProps);
        }

    },
    dateFormater: (columnProps) => {
        switch (columnProps.format) {
            default:
            case columnTypes.date.format.date:
                return (
                    <DatePicker
                        className="dp-temp"
                        disabled={columnProps.disabled}
                        onChange={columnProps.handleChange}
                        value={columnProps.filterTerm}
                    />
                )
            case columnTypes.date.format.month:
                return (
                    <MonthPicker
                        onGetPickerData={columnProps.handleGetMonth}
                        disabled={columnProps.disabled}
                        size="small"
                        format={{ year: 'YY' }}
                        showClear />
                )
            case columnTypes.date.format.month_range:
                return (
                    <MonthRangePicker
                        onGetPickerData={columnProps.handleGetMonthRange} />
                )
            case columnTypes.date.format.date_range:
                return (
                    <PeriodPicker onGetDateRange={columnProps.handleGetPeriod} />
                )
        }
    }
}