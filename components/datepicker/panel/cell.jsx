// import React, { Component } from 'react';
// import PropTypes from 'prop-types';


// export default class CalendarCell extends Component {
//     static propTypes = {
//         day: PropTypes.string,
//         month: PropTypes.string,
//         className: PropTypes.string,
//     }

//     handlerOnClickDay = ({target}) => {

//         const { hideSelector, onChangeDate, onCLick } = this.props;

//         let oldDate = this.state.tempValue;

//         let dataDate = target.getAttribute('data-day');
//         let dataMonth = target.getAttribute('data-month');

//         let newDate = moment(oldDate).month(dataMonth).date(dataDate).toDate();

//         this.setState({
//             tempValue: newDate
//         });

//         if (onChangeDate)
//             onChangeDate(oldDate, newDate);

//         if (hideSelector)
//             hideSelector();
//     };

//     render() {
//         const { className, day, month } = this.props;
//         return (
//             <div
//                 className={className}
//                 data-day={day}
//                 data-month={month}
//                 onClick={this.handlerOnClickDay}
//             >
//                 {day}
//             </div>
//         )
//     }
// }





// /**
//  * DatePicker
//  */

// class DatePickerSelector extends React.Component {
//     state = {
//         tempValue: this.props.value
//     };

    

//     renderDaysInMonth() {
//         let { value } = this.props;
//         let selectedDate = moment(value);
//         let selectedTempDate = moment(this.state.tempValue);
//         let daysInMonth = moment(this.state.tempValue).daysInMonth();
//         let startDate = moment(this.state.tempValue).date(1);

//         if (startDate.days() != 0)
//             startDate.subtract(startDate.days(), 'days');

//         let rows = [];
//         let daysIndex = 0;

//         for (var j = 0; j < 6; j++) {
//             let row = [];

//             for (var i = 0; i < 7; i++) {
//                 let className = 'datePickerSelectorTableDays';

//                 if (startDate.month() != selectedTempDate.month())
//                     className += 'NotInMonth';
//                 else if (startDate.date() == selectedDate.date() && startDate.month() == selectedDate.month())
//                     className += 'Selected';

//                 row.push();

//                 startDate.add(1, 'days');
//             }

//             rows.push(row);
//             daysIndex++;
//         }

//         return rows.map((row) => {
//             return (
//                 <tr>
//                     {row.map((item) => {
//                         return item;
//                     })}
//                 </tr>
//             );
//         });
//     }

//     render = () => {
//         let datePickerSelectorClassName = 'datePickerSelector';

//         if (this.props.isSelectorActive)
//             datePickerSelectorClassName += ' active';

//         return (
//             <div className={datePickerSelectorClassName}>
//                 <table className="datePickerSelectorTable">
//                     <tr className="datePickerSelectorTableHeader">
//                         <td onClick={this.clickPreviousMonth}></td>
//                         <td className="datePickerSelectorTableHeaderCurrentMonth" colSpan="5">{moment(this.state.tempValue).format("MMMM YYYY")}</td>
//                         <td onClick={this.clickNextMonth}></td>
//                     </tr>
//                     <tr className="datePickerSelectorTableDaysHeader">
//                         <td>Mo</td>
//                         <td>Tu</td>
//                         <td>We</td>
//                         <td>Th</td>
//                         <td>Fr</td>
//                         <td>Sa</td>
//                         <td>Su</td>
//                     </tr>
//                     {this.renderDaysInMonth()}
//                 </table>
//             </div>
//         );
//     };
// }

// class DatePicker extends React.Component {
//     state = {
//         value: this.props.value,
//         isSelectorActive: false
//     };

//     onChangeDate = (oldDate, newDate) => {
//         this.setState({
//             value: newDate
//         });
//     };

//     onChangeShowSelector = (value) => {
//         this.setState({
//             isSelectorActive: value
//         });
//     };

//     toggleSelector = () => {
//         this.onChangeShowSelector(!this.state.isSelectorActive);
//     };

//     showSelector = () => {
//         this.onChangeShowSelector(true);
//     };

//     hideSelector = () => {
//         this.onChangeShowSelector(false);
//     };

//     render() {
//         let { value, isSelectorActive } = this.state;
//         let { onChangeDate, showSelector, hideSelector, toggleSelector } = this;
//         let childProps = { value, isSelectorActive, onChangeDate, showSelector, hideSelector, toggleSelector };

//         return (
//             <div className="datePicker">
//                 <DatePickerSelector {...childProps} />
//             </div>
//         );
//     }
// }
