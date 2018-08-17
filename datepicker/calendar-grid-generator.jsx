import moment from 'moment';

export default function getCalendarGrid({ day, month, year }) {

    const date = moment({
        year,
        month: month -1,
        day
    });

    // init moment
    let localDate = moment(date, 'DD.MM.YYYY');

    // set 1 day of current month and then set 1 day of week
    localDate.date(1).weekday(0);

    let calendarGrid = [];

    for(let i = 0; i < 6; i++) {
        let calendarRow = [];
        for(let j = 0; j < 7; j++) {
            const gridItem = {
                day: localDate.date(),
                month: localDate.month() + 1,
                year: localDate.year(),
            }
    
            calendarRow.push(gridItem);
            localDate.add(1, 'days');
        
        }

        calendarGrid.push(calendarRow);
    }

    return calendarGrid;
}