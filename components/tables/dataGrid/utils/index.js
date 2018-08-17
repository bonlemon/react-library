import moment from 'moment';

import columnTypes from '../config/columnTypes';


/**
 * Расчет позиции ячеек, ширины столбцов
 * @param {Array} columns 
 * @param {Object} config 
 */
export function calcColumnsMetrics(columns, config) {
    let offset = 0;
    let startOffset = 0;
    let columnsMetrics = [];
    columns.map((column, idx) => {
        let currentIndex = idx;

        if (!column.width && !column.type) {
            column.width = config.defaultColumnWidth;
        }
        else if (!column.width && column.type) {
            column.width = columnTypes[column.type].width;
        }

        if (idx === 0) {
            startOffset = column.width;
        }
        else {
            let previousIndex = --idx;
            offset = columnsMetrics[previousIndex].leftOffset + startOffset;
            startOffset = column.width;
        }

        columnsMetrics.push({ id: currentIndex, fieldName: column.fieldName, leftOffset: offset, width: column.width });
    })
    // console.log(this.columnsMetrics)
    return columnsMetrics;
}


export function calcGridWidth(columnMetrics) {
    let gridWidth = 0;
    columnMetrics.forEach(metric => {
        gridWidth += metric.width
    });

    return gridWidth;
}


export function calcGridContainerSize(heightPad = 0, widthPad = 0) {

    return {
        'height': `calc(100% - ${heightPad}px)`,
        'width': `calc(100% - ${widthPad}px)`
    }
}

//**TOOLBAR_CALLBACKS */
export function clearSelectedRows(rows) {
    return rows.clear();
}


export function getDataCellFormatter({ value, type, format = '' }) {

    if (value === null || value === undefined) return;

    switch (type) {
        default:
        case columnTypes.string.value:
            return value;
        //return stringFormatter({value, format});

        case columnTypes.number.value:
            return value;

        case columnTypes.date.value:
            return dateFormatter({ value, format });
    }
}

function dateFormatter({ value, format }) {

    switch (format) {
        default:
        case 'date':
            return moment.utc(value).format(columnTypes.date.format.date);
            
        case 'date_range':
            return moment.utc(value).format(columnTypes.date.format.dateTime);

        case 'dateTime':
            return moment.utc(value).format(columnTypes.date.format.dateTime);

        case 'month':
            return moment().month(parseInt(value - 1)).format(columnTypes.date.format.month);

        case 'month_range':
            return value;

        case 'year':
            return moment().year(value).format(columnTypes.date.format.month);
    }
}

// function numberFormatter(value, format) {


// }

function stringFormatter({ value, format }) {
    switch (format) {
        case 'uppercase':
            return String(value).toUpperCase();
        case 'lowercase':
            return String(value).toLowerCase();
        case 'capitalize':
            return String(value)
        default:
            return value;
    }
}

export function correctRusCase(num, case1, case2, case3) {
    let remainder = num % 10;
    if (remainder == 0 || (remainder >= 5 && remainder <= 9) || (num >= 11 && num < 19))
        return case3;

    if (remainder == 1)
        return case1;

    if (remainder >= 2 && remainder <= 4)
        return case2;
}