import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { filterRowPlugin } from '../../plugins';


import './filterableHeaderCell.scss';

export default class FilterableHeaderCell extends Component {

    state = {
        filterTerm: '',
        filterData: {},
        disabled: false,
    }

    static propTypes = {
        leftOffset: PropTypes.number,
        width: PropTypes.number,
        fixed: PropTypes.bool,
        column: PropTypes.object,
        disabled: PropTypes.bool,
        keyName: PropTypes.string,
        onFilterChange: PropTypes.func,
        onFilterSave: PropTypes.func,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.disabled !== prevState.disabled) {
            return {
                disabled: nextProps.disabled
            }
        }
        return null;
    }

    getStyles() {
        const { width, leftOffset } = this.props;
        const styles = {
            width: `${width}px`,
            left: leftOffset
        };
        return styles;
    }

    getComponentClassNames() {
        const { fixed, disabled } = this.props;
        return classNames(
            'data-grid-header-cell',
            'data-grid-header-cell--filter',
            { 'data-grid-header-cell__fixed': fixed },
            { 'data-grid-header-cell__disabled': disabled },
        )
    }

    handleChange = async ({ ...params }) => {
        const { onFilterChange } = this.props;
        if (params.value && params.value !== this.state.filterTerm) {
            const {keyName, filterTerm} = await this.handleSaveTextFilter(params);
            onFilterChange(keyName, filterTerm);
        }
    }

    handleSaveTextFilter = ({...params}) => {
        const { keyName, onFilterSave } = this.props;

        if (params.value && params.value !== this.state.filterTerm) {
            this.setState({ filterTerm: params.value });
            onFilterSave(keyName, params.value);
            return {keyName, filterTerm: params.value};
        }
        return null;
    }

    clearTextFilter = ({ ...params }) => {
        const { filterTerm } = this.state;
        if (!params.value && filterTerm) {
            const { keyName, onFilterChange } = this.props;
            this.setState({ filterTerm: params.value });
            onFilterChange(keyName, params.value);
        }
    }

    handleGetMonth = ({ ...params }) => {
        const { keyName } = this.props;
        let filterData;
        if (!params.month && !params.year) {
            filterData = null;
        }
        else {
            filterData = {
                beginMonth: Number(params.month + 1),
                beginYear: Number(params.year),
                endMonth: Number(params.month + 1),
                endYear: Number(params.year),
            }
        }
    }


    handleGetMonthRange = ({ ...params }) => {
        const { keyName, onFilterChange } = this.props;

        const isNullableParams = Object.keys(params).some(key => Boolean(!params[key]));
        let filterData;
        if (isNullableParams) {
            filterData = undefined;
        }
        else {
            filterData = {
                beginMonth: Number(params.beginMonth),
                beginYear: Number(params.beginYear),
                endMonth: Number(params.endMonth),
                endYear: Number(params.endYear),
            }
        }

        this.setState({
            filterData: {
                ...this.state.filterData, ...filterData
            }
        });
        onFilterChange(keyName, filterData);
    }

    handleGetPeriod = ({ ...params }) => {
        const { keyName, onFilterChange } = this.props;
        const filterData = { ...params };
        if (!filterData.begin && !filterData.end) {
            onFilterChange(keyName, null);
        }
        else {
            this.setState({
                filterData: {
                    ...this.state.filterData, ...filterData
                }
            });
            onFilterChange(keyName, filterData);
        }
    }


    renderFilterableCellComponent = (column = {}) => {
        const { filterTerm, disabled } = this.state;
        const columnProps = {
            ...column,
            disabled,
            handleSaveTextFilter: this.handleSaveTextFilter,
            handleChange: this.handleChange,
            handleGetMonth: this.handleGetMonth,
            handleGetMonthRange: this.handleGetMonthRange,
            handleGetPeriod: this.handleGetPeriod,
            clearTextFilter: this.clearTextFilter,
            filterTerm
        };
        return filterRowPlugin.getComponentByTypes(columnProps);
    }

    render() {
        const { column } = this.props;

        return (
            <div className={this.getComponentClassNames()} style={this.getStyles()}>
                {
                    this.renderFilterableCellComponent(column)
                }
            </div>
        )
    }
}
