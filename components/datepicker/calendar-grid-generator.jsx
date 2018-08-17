import moment from 'moment';

export default function getCalendarGrid({ day, month, year }) {
    const date = moment().year(year).month(month).date(day);

    // date from props
    let localDate = moment(date, 'DD.MM.YYYY');
    const localMonth = moment(date, 'DD.MM.YYYY').month();

    console.log('localDate', localDate)
    // set 1 day of current month
    localDate.date(1);
    console.log('localDate', localDate)

    let calendarGrid = [];
    let calendarRow = [];

    const weekDay = localDate.day() == 0 ? 7 : localDate.day();

    // empty items before week day of first of the year
    for (var i = 1; i < weekDay; i++) {
        const gridItem = null;
        calendarRow.push(gridItem);
    }

    // date of calendar
    while (localDate.month() == localMonth) {

        const gridItem = {
            day: localDate.date(),
            month: localDate.month() + 1,
            year: localDate.year(),
        }

        if (localDate.day() == 1) {
            calendarGrid.push(calendarRow);
            calendarRow = [];
        }
        calendarRow.push(gridItem);
        localDate.add(1, 'days');
    }

    // добить таблицу пустыми ячейками, если нужно
    if (localDate.day() !== 1) {
        for (let i = localDate.day(); i < 8; i++) {

            const gridItem = null;

            calendarRow.push(gridItem);
        }
    }

    calendarGrid.push(calendarRow);

    return calendarGrid;
}