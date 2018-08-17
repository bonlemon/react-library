import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import DataGridRow from './dataGridRow';

import { calcGridWidth } from '../utils';

import './dataGridBody.scss';

export default class DataGridBody extends Component {

    constructor(props) {
        super(props)

        this.gridRow = React.createRef();
    }


    state = {
        clickedRowId: null
    }

    static propTypes = {
        columnsMetrics: PropTypes.array,
        columns: PropTypes.array,
        rows: PropTypes.array,
        handlerScrollHorizontal: PropTypes.func,
        config: PropTypes.object,
        rowSelection: PropTypes.instanceOf(Set),
    }

    getComponentClassNames() {
        const { config: { paging } } = this.props;
        return classNames(
            'data-grid-body',
            { 'data-grid-body--with-paging': paging.enabled }
        )
    }

    getLeftOffset = fieldName => {
        const { columnsMetrics } = this.props;
        let leftOffset = columnsMetrics.filter(item => {
            return item.fieldName === fieldName;
        });
        if (leftOffset.length) {
            return leftOffset[0].leftOffset;
        }
    }

    getGridCanvasStyles() {
        const { columnsMetrics } = this.props;
        if (columnsMetrics && columnsMetrics.length > 0) {
            return { 'maxWidth': calcGridWidth(columnsMetrics) }
        }
    }

    checkIsRowSelected = (row) => {
        const { rowSelection } = this.props;
        if (row) {
            let arrRowSelection = [...rowSelection];
            return arrRowSelection.some(rowIdx => {
                return rowIdx == row.id
            })
        }
    }

    handlerRowClick = (event, rowData) => {
        //console.log(event.target)
        const rowClasses = event.target.parentElement.classList;
        if (!rowClasses.contains('data-grid-cell--check') && !rowClasses.contains('b-checkbox')) {
            const { onRowClick } = this.props;
            this.setState({ clickedRowId: rowData.id }, () => onRowClick && onRowClick(event, rowData))
        }
    }

    handleRowDoubleClick = ({ event, rowData }) => {
        const rowClasses = event.target.parentElement.classList;
        if (!rowClasses.contains('data-grid-cell--check') && !rowClasses.contains('b-checkbox')) {
            const { onRowDoubleClick } = this.props;
            this.setState({ clickedRowId: rowData.id }, () => onRowDoubleClick && onRowDoubleClick({ event, rowData }))
        }
    }

    checkRowWasClicked({ id }) {
        return id == this.state.clickedRowId;
    }

    render() {
        const { columns,
            columnsMetrics,
            rows,
            handlerScrollHorizontal,
            selectAllRows,
            onRowSelected,
            onRowDeselected,
            config,
            disabledKey
        } = this.props;

        return (
            <div className={this.getComponentClassNames()}>
                <div className="data-grid-canvas"
                    onScroll={handlerScrollHorizontal}
                    style={this.getGridCanvasStyles()}>
                    {
                        rows && rows.length > 0 && columns && columnsMetrics ?
                            (
                                rows.map(row => {
                                    const isSelected = this.checkIsRowSelected(row);
                                    const wasClicked = this.checkRowWasClicked(row)
                                    return <DataGridRow
                                        key={row.id}
                                        id={`row_${row.id}`}
                                        ref={this.gridRow}
                                        rowData={row}
                                        columns={columns}
                                        defaultColumnWidth={config.defaultColumnWidth}
                                        columnsMetrics={columnsMetrics}
                                        selectAllRows={selectAllRows}
                                        onRowSelected={onRowSelected}
                                        isSelect={isSelected}
                                        wasClicked={wasClicked}
                                        onRowDeselected={onRowDeselected}
                                        onRowClick={this.handlerRowClick}
                                        onRowDoubleClick={this.handleRowDoubleClick}
                                        disabled={disabledKey ? Boolean(row[disabledKey]) : false}

                                    //onRowDoubleClick={onRowDoubleClick}
                                    />
                                })
                            )
                            :
                            (
                                <div className="no-data-block">
                                    {config.bodyConfig.noDataText}
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}