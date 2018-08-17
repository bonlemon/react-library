import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import columnTypes from '../../config/columnTypes'
import DataGridCell from '../dataGridCell';
import CheckboxGridCell from '../checkboxGridCell';

//import { Link } from 'react-router-dom';

import './dataGridRow.scss';

export default class DataGridRow extends Component {

    state = {
        selected: false,
    }

    static propTypes = {
        rowData: PropTypes.object,
        columns: PropTypes.array,
        columnsMetrics: PropTypes.array,
        defaultColumnWidth: PropTypes.number,
        isSelect: PropTypes.bool,
        wasClicked: PropTypes.bool,
        onRowSelected: PropTypes.func,
        onRowDeselected: PropTypes.func,
        onRowClick: PropTypes.func,
        onRowDoubleClick: PropTypes.func,
    }

    componentDidMount() {
        if (this.props.isSelect !== this.state.selected)
            this.setState({ selected: this.props.isSelect })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSelect !== this.state.selected) {
            this.setState({ selected: nextProps.isSelect })
        }
    }


    getComponentClassNames = () => {
        const { selected } = this.state;
        const { wasClicked, disabled } = this.props;
        return classNames(
            'data-grid-row',
            { 'data-grid-row--selected': selected },
            { 'data-grid-row--clicked': wasClicked },
            { 'data-grid-row--disabled': disabled }
        );
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

    onRowSelect(rowId) {
        const { onRowSelected } = this.props;
        this.setState({ selected: true });
        onRowSelected(rowId);
    }

    onRowDeselect(rowId) {
        const { onRowDeselected } = this.props;
        this.setState({ selected: false });
        onRowDeselected(rowId);
    }

    handlerRowSelect = isSelected => {
        const { rowData: { id: rowId } } = this.props;
        isSelected ?
            this.onRowSelect(rowId) : this.onRowDeselect(rowId)
    }

    handlerOnRowClick = event => {
        const { onRowClick, rowData } = this.props;
        event.persist();
        onRowClick(event, rowData);
    }

    handlerOnRowDoubleClick = event => {
        const {onRowDoubleClick, rowData} = this.props;
        onRowDoubleClick({event, rowData});
    }


    renderCheckboxGridCell = (column) => {
        const { disabled } = this.props;
        return <CheckboxGridCell
            key={column.fieldName}
            leftOffset={this.getLeftOffset(column.fieldName)}
            width={column.width}
            checked={this.state.selected}
            onClick={this.handlerRowSelect}
            disabled={disabled}
        />
    }

    renderDataGridCell = (column, cellValue) => {
        const { defaultColumnWidth } = this.props;
        return <DataGridCell
            key={column.fieldName}
            value={cellValue}
            leftOffset={this.getLeftOffset(column.fieldName)}
            cellType={column.type}
            cellFormat={column.format}
            width={column.width || defaultColumnWidth}
            isFixed={column.fixed}
            align={column.align}
        />
    }

    render() {
        const { rowData, columns, columnsMetrics, disabled, id } = this.props;

        return (
            <div id={id} 
                className={this.getComponentClassNames()}
                onClick={this.handlerOnRowClick}
                onDoubleClick={this.handlerOnRowDoubleClick}>
                {
                    rowData && columns && columnsMetrics ?
                        (   
                            columns.map(column => {
                                const cellValue = rowData[column.fieldName];
                                
                                if (column.type === columnTypes.checkbox.value) {
                                    return this.renderCheckboxGridCell(column)
                                }
                                else {
                                    return this.renderDataGridCell(column, cellValue);
                                }
                            })
                        ) : null
                }
            </div>
        )
    }
}

