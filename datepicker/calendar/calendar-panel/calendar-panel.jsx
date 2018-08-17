import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CalendarPanelDay from './day';
// import CalendarPaneMonth from './panel-month';
// import CalendarPaneYear from './panel-year';
// import CalendarPaneDecade from './panel-decade';


export default class CalendarPanel extends Component {
    static propTypes = {
        mode: PropTypes.oneOf(['decade', 'year', 'month', 'day']),
        // calendarGrid: PropTypes.arrayOf(
        //     PropTypes.arrayOf(
        //         PropTypes.shape({
        //             date: PropTypes.oneOfType([
        //                 PropTypes.number,
        //                 PropTypes.string,
        //             ]),
        //             year: PropTypes.oneOfType([
        //                 PropTypes.number,
        //                 PropTypes.string,
        //             ]),
        //             month: PropTypes.oneOfType([
        //                 PropTypes.number,
        //                 PropTypes.string,
        //             ]),
        //         })
        //     )
        // ),
        onClick: PropTypes.func
    }

    static defaultProps = {
        mode: 'day'
    }

    renderPanelByMode = () => {
        const { mode, ...restProps } = this.props;

        if (mode === 'day') return <CalendarPanelDay {...restProps} />
        // if (mode === 'month') return <CalendarPaneDay {...restProps} />
        // if (mode === 'year') return <CalendarPaneDay {...restProps} />
        // if (mode === 'decade') return <CalendarPaneDay {...restProps} />
    }

    render() {
        return (
            <div className='calendar-panel'>
                {this.renderPanelByMode()}
            </div>
        )
    }
}