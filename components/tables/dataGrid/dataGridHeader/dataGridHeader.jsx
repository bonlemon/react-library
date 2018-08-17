import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import columnTypes from '../config/columnTypes';

import DataGridHeaderRow from './dataGridHeaderRow';
import DataGridHeaderCell from './dataGridHeaderCell';
import CheckboxHeaderCell from './checkboxHeaderCell';
import FilterableHeaderCell from './filterableHeaderCell';

import './dataGridHeader.scss';

export default class DataGridHeader extends Component {

    static propTypes = {
        hasFilterRow: PropTypes.bool,
        columnsMetrics: PropTypes.array,
        disabled: PropTypes.bool,
        onCheckboxClick: PropTypes.func,
        headerClick: PropTypes.func,
        sortBy: PropTypes.string,
        descending: PropTypes.bool,
        columns: PropTypes.array,
        canFilter: PropTypes.bool,
        headerRows: PropTypes.array,
    }


    getComponentClassNames = () => {
        const { hasFilterRow } = this.props;
        return classNames('data-grid-header', { 'data-grid-header--has-filter-row': hasFilterRow })
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

    getColumnsOptions() {
        const { columns, config: { headerConfig } } = this.props;
        return headerConfig ?
            columns.map(column => ({ ...column, ...headerConfig }))
            :
            columns;
    }

    renderCheckboxHeaderCell = column => {
        const { disabled, onCheckboxClick } = this.props;
        
        return (
            <CheckboxHeaderCell
                key={column.fieldName}
                leftOffset={this.getLeftOffset(column.fieldName)}
                styles={column.styles}
                width={column.width}
                disabled={disabled}
                onChecked={onCheckboxClick}
            />
        )
    }

    renderHeaderCell = column => {
        const { config: { defaultColumnWidth }, headerClick, sortBy, descending, disabled } = this.props;
        return <DataGridHeaderCell
            key={column.fieldName}
            keyName={column.fieldName}
            sortable={column.sortable}
            leftOffset={this.getLeftOffset(column.fieldName)}
            width={column.width || defaultColumnWidth}
            fieldCaption={column.fieldCaption}
            fixed={column.fixed}
            type={column.type}
            default={column.default}
            onSort={headerClick}
            sortBy={sortBy}
            descending={descending}
            disabled={disabled}
            styles={column.styles}
        />
    }

    renderFilterableHeaderCell = ({ column, rowProps }) => {

        const { config: { defaultColumnWidth }, disabled } = this.props;
        const { onFilterChange, onFilterSave } = rowProps;

        return <FilterableHeaderCell
            key={column.fieldName}
            keyName={column.fieldName}
            leftOffset={this.getLeftOffset(column.fieldName)}
            width={column.width || defaultColumnWidth}
            fixed={column.fixed}
            column={column}
            onFilterChange={onFilterChange}
            onFilterSave={onFilterSave}
            disabled={disabled} />
    }

    renderHeaderRow = row => {
        const { columns, canFilter } = this.props;
        const columnsOptions = this.getColumnsOptions();

        switch (row.rowType) {
            default:
            case 'header':
                return (
                    <DataGridHeaderRow key='header' type={row.rowType}>
                        {
                            columnsOptions.map(column => {

                                if (column.type == columnTypes.checkbox.value) {
                                    if (column.selectAll) {
                                        return this.renderCheckboxHeaderCell(column)
                                    }
                                    else if(column.selectAll === false) {
                                        return this.renderHeaderCell({...column, fieldCaption: '', sortable: false})
                                    }
                                }
                                else {
                                    return this.renderHeaderCell(column);
                                }
                            })
                        }
                    </DataGridHeaderRow>
                );
            case 'filter':
                return (
                    <DataGridHeaderRow key='filter' type={row.rowType}>
                        {
                            columns.map(column => {
                                if (canFilter && column.filterable === false) {
                                    let filterableColumn = { ...column, fieldCaption: '', sortable: false };
                                    return this.renderHeaderCell(filterableColumn);
                                }
                                else if (canFilter) {
                                    return this.renderFilterableHeaderCell({ column, rowProps: row });
                                }
                            })
                        }
                    </DataGridHeaderRow>
                );
        }
    }

    render() {
        const { columns, columnsMetrics, headerRows } = this.props;


        return (
            <div className={this.getComponentClassNames()}>
                {
                    headerRows && columns && columnsMetrics ?
                        (
                            headerRows.map(row => {
                                return this.renderHeaderRow(row);
                            })
                        )
                        : null
                }
            </div>
        )
    }
}