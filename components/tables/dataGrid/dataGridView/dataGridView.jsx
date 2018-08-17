import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import columnTypes from '../config/columnTypes';
import { TOOLBAR_CALLBACKS, GRID_EVENTS } from '../config/constants';
import {
    calcColumnsMetrics,
    calcGridContainerSize,
    clearSelectedRows
} from '../utils';

import { onGetSelectedRows } from '../utils/rowsActions';

import DataGridToolbar from '../toolbar';
import DataGridHeader from '../dataGridHeader';
import DataGridBody from '../dataGridBody';
import DataGridPager from '../pager';

import Spinner from 'medx/components/blocks/Spinner';

import './dataGridView.scss';



export default class DataGridView extends Component {


    state = {
        columns: [],
        columnsMetrics: [],
        rows: [],
        sorting: {
            sortBy: null,
            descending: false,
        },
        rowSelection: false,
        selectAllRows: false,
        selectedRows: new Set(),
        canFilter: false,
        headerRows: [{
            height: 50,
            rowType: 'header',
        }],
        filters: {},
        config: {
            headerConfig: {},
            bodyConfig: {},
        },
        paging: {
            currentPage: 1,
            pageSize: 0,
            skip: 0
        },
        scrolling: {
            scrollLeft: 0,
            scrollTop: 0
        },
    }

    static propTypes = {
        id: PropTypes.string,
        data: PropTypes.array,
        filters: PropTypes.any,
        config: PropTypes.object,
        onChangeFilter: PropTypes.func,
        columns: PropTypes.array,
        totalCount: PropTypes.number,
        rowSelection: PropTypes.bool,
        onRowClick: PropTypes.func,
        onRowDoubleClick: PropTypes.func,
        onGetSelectedRows: PropTypes.func,
        onSelectRow: PropTypes.func,
    }

    static defaultProps = {
        id: 'data-grid'
    }

    static childContextTypes = {
        callback: PropTypes.func,
    }

    UNSAFE_componentWillMount() {
        const { columns, data } = this.props;
        this.getRowData(data);
        columns && this.getColumnsDefinition(columns);
    }

    componentDidMount() {
       // console.log(this.props)
        const { columns } = this.state;
        const { config } = this.props;
        this.getColumnsMetrics(columns, config);
        this.hasPaging(config);
        this.hasFilterRow(config);
        this.setScrollPositionGridBody();
        if ('rowSelection' in this.props.config) {
            this.props.config.rowSelection && document.addEventListener('clearSelection', this.onRowsDeselect) //TODO: сделать через конфиг Custom Events и refs API, когда-нибудь
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getRowData(nextProps.data);
        this.getColumnsDefinition(nextProps.columns);
        this.getColumnsMetrics(this.state.columns, nextProps.config);
    }

    componentDidUpdate(pP, pS) {
        this.setScrollPositionGridBody();
    }

    componentWillUnmount() {
        document.removeEventListener('clearSelection', this.onRowsDeselect);
    }

    getChildContext() {
        return {
            callback: this.handlerCallback
        }
    }

    getGridContainerSize() {

        const { config } = this.props;
        const { containerSize: { heightPad = 0, widthPad = 0 } = {}, } = config;

        if (config && config.containerSize) {
            const { containerSize: { heightPad, widthPad }, } = config;
            return calcGridContainerSize(heightPad, widthPad);
        }
        return calcGridContainerSize(heightPad, widthPad);
    }

    getContainerClasses() {
        const { config } = this.props;
        return classNames(
            'data-grid-container',
            { 'data-grid-container__with-toolbar': config.toolbar.enabled },
            { 'data-grid-container__with-filterrow': config.filterRowEnabled }
        )
    }

    getColumnsMetrics(columns, config) {
        const columnsMetrics = calcColumnsMetrics(columns, config);
        this.setState({
            columnsMetrics
        })
    }

    getColumnsDefinition(columns) {
        const { config } = this.props;
        if (!config.rowSelection) {
            this.setState({ columns: columns, })
        }
        else if (config.rowSelection) {
            this.setState({
                columns: columns,
            }, () => {
                this.hasRowSelection();

            });
        }
    }

    getRowData(data) {
        if (data) {
            this.setState({ rows: data })
        }
    }

    //** Выбор строк - добавляем столбец с чекбоксом */
    hasRowSelection() {
        this.setState(prevState => ({
            columns: [columnTypes.checkbox, ...prevState.columns]
        }), () => this.getColumnsMetrics(this.state.columns, this.props.config))
    }

    //** Проверка на наличие фильтра */
    hasFilterRow = config => {
        if (config.filterRowEnabled) {
            this.setState(prevState => ({
                canFilter: config.filterRowEnabled,
                headerRows: [...prevState.headerRows, 
                { rowType: 'filter', onFilterChange: this.handleApplyFilters, onFilterSave: this.handleSaveFilter }]
            }))
        }
    }

    hasPaging(config) {
        const { paging } = config;

        if (paging && paging.enabled) {
            this.setState({ paging: { ...this.state.paging, pageSize: paging.pageSize } })
        }
    }

    //** Обработка горизонтального скроллинга */
    handlerScrollHorizontal = (e) => {
        //console.log(e.target.scrollLeft, e.target.scrollTop);
        this.setState({
            scrolling: {
                ...this.state.scrolling,
                scrollLeft: e.target.scrollLeft,
                scrollTop: e.target.scrollTop
            }
        })
        //const gridHeaderRow = document.getElementsByClassName('data-grid-header-row');
        //const { headerRows } = this.state;

        // headerRows.forEach((val, index) => {
        //     gridHeaderRow[index].scrollLeft = e.target.scrollLeft;
        // })
        // const { columns } = this.state;
        // const hasFixedColumns = columns.find(column => column.fixed === true);
        // if (hasFixedColumns) {
        //     let headerFixedCells = document.getElementsByClassName('data-grid-header-cell__fixed');
        //     for (let fixedHeaderCell of headerFixedCells) {
        //         fixedHeaderCell.style.transform = `translate3d(${e.target.scrollLeft}px, 0px, 0px)`;
        //     }

        //     let tableFixedCells = document.getElementsByClassName('data-grid-cell__fixed');
        //     for (let fixedTableCell of tableFixedCells) {
        //         fixedTableCell.style.transform = `translate3d(${e.target.scrollLeft}px, 0px, 0px)`;
        //     }
        // }
    }

    setScrollPositionGridBody() {
        const { scrolling, headerRows } = this.state;
        const { id: gridId } = this.props;
        const grid = document.getElementById(gridId);
        const gridHeaderRow = grid.getElementsByClassName('data-grid-header-row');
        const gridCanvas = grid.getElementsByClassName('data-grid-canvas');
        gridCanvas[0] ? gridCanvas[0].scrollLeft = scrolling.scrollLeft : null
        headerRows.forEach((val, index) => {
            gridHeaderRow[index].scrollLeft = scrolling.scrollLeft;
        })
        const { columns } = this.state;
        const hasFixedColumns = columns.find(column => column.fixed === true);
        if (hasFixedColumns) {
            let headerFixedCells = grid.getElementsByClassName('data-grid-header-cell__fixed');
            for (let fixedHeaderCell of headerFixedCells) {
                fixedHeaderCell.style.transform = `translate3d(${scrolling.scrollLeft}px, 0px, 0px)`;
            }

            let tableFixedCells = grid.getElementsByClassName('data-grid-cell__fixed');
            for (let fixedTableCell of tableFixedCells) {
                fixedTableCell.style.transform = `translate3d(${scrolling.scrollLeft}px, 0px, 0px)`;
            }
        }
    }

//#region ** Сортировка */
    handlerSort = (event, columnKey) => {
        const { config } = this.props;
        if (config.sorting) {
            const { sorting: { sortBy, descending } } = this.state;
            //если включена "удаленная" сортировка
            let descDirection = sortBy === columnKey && !descending;
            if (config.remoteOperations && config.remoteOperations.sorting) {
                const { onSorting } = this.props;
                if (onSorting) {
                    this.setState({
                        sorting: {
                            ...this.state.sorting,
                            sortBy: columnKey,
                            descending: descDirection,
                        },
                    });
                    // внешний обработчик
                    onSorting({ event, columnKey, descDirection });
                }
                else {
                    throw new Error('method onSorting() for remote operations - is undefined!');
                }
            }
            else {//** локальная сортировка - все данные загружены в грид */
                const rows = [...this.state.rows];
                rows.sort((a, b) => {
                    return descDirection ?
                        (a[columnKey] > b[columnKey] ? 1 : -1)
                        :
                        (a[columnKey] < b[columnKey] ? 1 : -1);
                });
                this.setState({
                    sorting: {
                        ...this.state.sorting,
                        sortBy: columnKey,
                        descending: descDirection,
                    },
                    rows,
                });
            }
        }
    }
//#endregion

    //** Выбрать все строки/ Снять выделение */
    handlerSelectAllRows = selectState => {
        selectState ?
            this.onRowsSelected() : this.onRowsDeselect();
    }

    //** Выбрать все строки */
    onRowsSelected = () => {
        const { rows } = this.state;
        rows.map(row => {
            this.handlerSelectRow(row.id);
        })
    }

    //** Снять выделение */
    onRowsDeselect = (e) => {
        const { selectedRows } = this.state;
        if (selectedRows && selectedRows.size > 0) {
            selectedRows.clear();
            this.setState({ selectedRows: selectedRows },
                () => {
                    this.externalHandlerOnSelectRow(this.state.selectedRows);

                });
        }
    }

    //FIXME: Нужна обработка фильтров
    shouldDisableComponent() {
        const { rows, filters: { filterTerm } } = this.state;
        // return (rows.length === 0 && !filterTerm);
        return false;
    }


    handlerSelectRow = (rowId) => {
        this.setState(prevState => ({
            selectedRows: prevState.selectedRows.add(rowId)
        }), () => this.externalHandlerOnSelectRow(this.state.selectedRows))
    }


    handlerDeselectRow = (rowId) => {
        let prevState = this.state;
        prevState.selectedRows.delete(rowId);
        this.setState({ selectedRows: prevState.selectedRows },
            () => this.externalHandlerOnSelectRow(this.state.selectedRows))
    }


    externalHandlerOnSelectRow = (rowsSet) => {
        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow([...rowsSet])
        }
    }

    handlerCallback = (callback) => {
        if (typeof callback === 'function') {
            // TODO =>
            () => callback()
        }
        else if (typeof callback === 'string') {
            switch (callback) {
                case TOOLBAR_CALLBACKS.CLEAR_SELECTED_ROWS:
                    this.onRowsDeselect()
                    break;
                default:
                    return
            }
        }
    }

    handleSaveFilter = (filterName, filterTerm) => {
        
        this.setState({
            filters: {
                ...this.state.filters,
                [filterName]: filterTerm,
            }
        })
    }

    handleApplyFilters = (filterName, filterTerm) => {
        const { config, onChangeFilter } = this.props;
        const remoteFiltering = Boolean(config.remoteOperations && config.remoteOperations.filtering);
        this.setState({
            filters: {
                ...this.state.filters,
                [filterName]: filterTerm,
            }
        }, () => remoteFiltering && onChangeFilter && onChangeFilter(this.state.filters))
    }


    onFilter = (filterName, filterTerm) => {
        const { config, onChangeFilter } = this.props;
        const remoteFiltering = Boolean(config.remoteOperations && config.remoteOperations.filtering);
        this.setState({
            filters: {
                ...this.state.filters,
                [filterName]: filterTerm,
            }
        }, () => { remoteFiltering && onChangeFilter && onChangeFilter(this.state.filters) })


        // if (config.remoteOperations && config.remoteOperations.filtering) {
        //     onChangeFilter && onChangeFilter(filterName, filterTerm);
        // }
        // else {
        //     //TODO: Локальная фильтрация
        //     this.setState({
        //         filters: {
        //             ...this.state.filters,
        //             [filterName]: filterTerm,
        //         }
        //     })
        // const { expertises } = this.props; //данные из контейнера (селектор, API)
        // let filteredRows = expertises.filter(row => {
        //     let formatedRow = row[filterName].toLowerCase();
        //     let formatedTerm = filterTerm.toLowerCase();
        //     let result = formatedRow.includes(formatedTerm);
        //     return result;
        // })
        //}
    }

    //TODO: 
    handlerChangePage = ({ pageNumber, skip }) => {

        this.setState({
            paging: { ...this.state.paging, currentPage: pageNumber, skip },
        });
        const { onChangePage } = this.props;
        const { paging: { pageSize } } = this.state;
        onChangePage && onChangePage(pageNumber, skip, pageSize);
    }

    //TODO: #необходимопеределать в 16.3
    renderDataGridToolbar() {
        const { config: { toolbar }, componentForActionPanel } = this.props;
        const { columnsMetrics, selectedRows } = this.state;

        return (
            toolbar && toolbar.enabled ?
                <DataGridToolbar
                    componentForActionPanel={componentForActionPanel}
                    selectedRows={selectedRows}
                    columnsMetrics={columnsMetrics}
                    disabled={this.shouldDisableComponent()}
                />
                : null
        )
    }

    renderDataGridHeader() {
        const { columns, columnsMetrics, canFilter, headerRows, rows } = this.state;
        const { config } = this.props;

        return (
            <DataGridHeader
                columns={columns}
                {...this.state}
                columnsMetrics={columnsMetrics}
                headerClick={this.handlerSort}
                onCheckboxClick={this.handlerSelectAllRows}
                hasFilterRow={canFilter}
                headerRows={headerRows}
                config={config}
                disabled={this.shouldDisableComponent()}
            />
        )
    }

    renderDataGridBody() {
        const { columns, columnsMetrics, selectedRows, rows } = this.state;
        const { config, onRowClick, onRowDoubleClick } = this.props;

        return (
            <DataGridBody
                columns={columns}
                {...this.state}
                columnsMetrics={columnsMetrics}
                rows={rows}
                handlerScrollHorizontal={this.handlerScrollHorizontal}
                onRowSelected={this.handlerSelectRow}
                onRowDeselected={this.handlerDeselectRow}
                onRowClick={onRowClick}
                onRowDoubleClick={onRowDoubleClick}
                rowSelection={selectedRows}
                config={config}
                disabledKey="medicalRequest" //FIXME: Вынести в контейнер
            />
        )
    }

    renderDataGridPager() {
        const {
            config: { paging },
            totalCount,
            isFetching, } = this.props;

        const { rows, columnsMetrics, paging: { currentPage } } = this.state;

        return (
            (rows && rows.length > 0) && paging && paging.enabled ?
                <DataGridPager
                    totalCount={totalCount}
                    columnsMetrics={columnsMetrics}
                    pageSize={paging.pageSize}
                    currentPage={currentPage}
                    onChangePage={this.handlerChangePage}
                    disabled={isFetching}
                />
                :
                null
        )
    }


    render() {
        const { columns, columnsMetrics } = this.state;
        const { isFetching, id } = this.props;
        
        return (
            <div id={id}
                className={this.getContainerClasses()}
                style={this.getGridContainerSize()}>
                <div className="data-grid-view">
                    {
                        columns && columnsMetrics ?
                            (
                                <Fragment>
                                    {this.renderDataGridToolbar()}
                                    {this.renderDataGridHeader()}
                                    {!isFetching ? this.renderDataGridBody() : <Spinner />}
                                    {this.renderDataGridPager()}
                                </Fragment>
                            )
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}
