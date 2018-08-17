const CHECKBOX = 'checkbox';
const STRING = 'string';
const NUMBER = 'number';
const DATE = 'date';

const columnTypes = {
    checkbox: {
        fixed: true,
        fieldName: '_cb',
        fieldCaption: '',
        type: CHECKBOX,
        value: CHECKBOX,
        width: 50,
        sortable: false,
        filterable: false,
    },

    string: {
        value: STRING,
        width: 150
    },

    number: {
        value: NUMBER,
        width: 80
    },

    date: {
        value: DATE,
        width: 120,
        format: {
            date: 'DD.MM.YYYY',
            dateTime: 'DD.MM.YYYY HH:mm',
            month: 'MMMM',
            year: 'YYYY',
            period: 'period',
            month_year: 'month_year',
            month_range: 'month_range',
            date_range: 'date_range',
        },

    }
}

export default columnTypes;