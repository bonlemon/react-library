import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';


import './dataGridHeaderCell.scss';


export default class DataGridHeaderCell extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        leftOffset: PropTypes.number,
        styles: PropTypes.object,
        width: PropTypes.number,
        sortBy: PropTypes.string,
        descending: PropTypes.bool,
        sortable: PropTypes.bool,
        onSort: PropTypes.func,

    }

    getStyles = () => {
        const { width, leftOffset, styles } = this.props;
        if (typeof leftOffset != 'undefined') {
            return {
                width: `${width}px`,
                left: leftOffset,
                ...styles
            }
        }
        else return;
    }

    getSortArrow = () => {
        const { sortBy, descending, keyName } = this.props;
        if (sortBy === keyName) {
            return descending ? 
                ' \u2191' : ' \u2193';
        }
        else 
            return '';
    }

    getComponentClassNames = () => {
        const { fixed } = this.props;
        return classNames('data-grid-header-cell', { 'data-grid-header-cell__fixed': fixed })
    }

    handlerClick = () => {
        this.props.sortable && this.props.onSort(this.props.keyName);
    }

    render() {
        
        const { fieldCaption } = this.props;
        const arrow = this.getSortArrow();

        return (
            <div className={this.getComponentClassNames()} style={this.getStyles()} onClick={this.handlerClick} >
                {
                    fieldCaption ?
                        (`${fieldCaption}  ${arrow}`) : this.props.children
                }
            </div>
        )
    }
}