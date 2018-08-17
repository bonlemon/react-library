import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PagerButton from './pager-button'
import PagerButtonsGroup from './pager-button-group'

import { correctRusCase, calcGridWidth } from '../utils';

import './pager.scss';

export default class DataGridPager extends Component {

    state = {
        currentPage: 1,
        totalPages: null,
        disabled: false,
    }

    static propTypes = {
        columnsMetrics: PropTypes.array,
        totalCount: PropTypes.number,
        pageSize: PropTypes.number,
        currentPage: PropTypes.number,
        disabled: PropTypes.bool,
        onChangePage: PropTypes.func,
    }

    componentWillMount() {
        this.setState({
            totalPages: 0,
            disabled: this.props.disabled
        })
    }

    componentDidMount() {
        this.calcCountOfPages()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: nextProps.disabled
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.totalCount != this.props.totalCount) {
            this.calcCountOfPages();
            if(prevProps.totalCount > this.props.totalCount) {
                this.setState({currentPage: 1});
            }

        }
    }

    //**Calculations*/
    isPreviousDisabled() {
        const { disabled } = this.state;
        return disabled || this.state.currentPage <= 1;
    }

    isNextDisabled() {
        const { disabled } = this.state;
        return disabled || this.state.currentPage >= this.state.totalPages;
    }

    getRecordCounterMessage(num) {
        const correctString = correctRusCase(num, 'запись', 'записи', 'записей');
        return `Всего ${num} ${correctString}`;
    }

    calcCountOfPages = () => {
        const { totalCount, pageSize } = this.props;
        let totalPages =  Math.ceil(totalCount / pageSize);
        this.setState({totalPages})
    }

    getPagerStyles() {
        const { columnsMetrics } = this.props;
        if (columnsMetrics && columnsMetrics.length > 0) {
            return { 'maxWidth': calcGridWidth(columnsMetrics) }
        }
    }

    //**HANDLERS*/
    handlerPreviousPage = () => {
        if (!this.isPreviousDisabled()) {
            const { currentPage } = this.state;
            this.handlerPageChanged(currentPage - 1);
        }
    }

    handlerNextPage = () => {
        if (!this.isNextDisabled()) {
            const { currentPage } = this.state;
            this.handlerPageChanged(currentPage + 1);
        }
    }
    
    handlerPageChanged = pageNumber => {
        const { onChangePage, pageSize } = this.props;
        const { currentPage } = this.state;
        if (currentPage != pageNumber) {
            this.setState({
                currentPage: Number(pageNumber)
            })
            const skip = Number((pageNumber - 1) * pageSize);
            //const top = Number(pageSize);
            //console.log(pageNumber, skip, top);
            onChangePage({ pageNumber, skip });
        }
    }

    render() {

        const { totalCount, pageSize, disabled } = this.props;
        const { totalPages, currentPage } = this.state;

        return (
            <div className="data-grid-pager-container">
                <div className="data-grid-pager" style={this.getPagerStyles()}>
                    <div className="data-grid-pager--left-block">
                        <div className="data-grid-pager__record-counter">
                            {/* {this.getRecordCounterMessage(totalCount)} */}
                        </div>
                        <div className="data-grid-pager__page-counter">
                            {
                                `страница ${currentPage} из ${totalPages}`
                            }
                        </div>
                    </div>

                    <div className="data-grid-pager--right-block">
                        <div className="data-grid-pager__buttons">
                            <PagerButton
                                type={'previous-page'}
                                disabled={this.isPreviousDisabled()}
                                onClickButton={this.handlerPreviousPage}
                            />
                            <PagerButtonsGroup
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalCount={totalCount}
                                pageSize={pageSize}
                                disabled={disabled}
                                onSetCurrentPage={this.handlerPageChanged}
                            />
                            <PagerButton
                                type={'next-page'}
                                disabled={this.isNextDisabled()}
                                onClickButton={this.handlerNextPage}
                            />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
