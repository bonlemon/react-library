import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { getDataCellFormatter } from '../../utils';

import './dataGridCell.scss';

export default class DataGridCell extends Component {

    state = {
        value: null
    }

    static propTypes = {
        width: PropTypes.number,
        leftOffset: PropTypes.number,
        isFixed: PropTypes.bool,
        cellType: PropTypes.string,
        cellFormat: PropTypes.string,
        value: PropTypes.any,
        align: PropTypes.string,
    }

    getStyles = () => {
        const { width, leftOffset } = this.props;
        const styles = {
            width: `${width}px`,
            left: leftOffset
        };
        return styles;
    }



    formatDataCell = ({value, type, format}) => {
        
        return getDataCellFormatter({value, type, format});
    }

    getComponentClassNames = () => {
        const { isFixed, cellType = 'string', cellFormat, align } = this.props;
        return classNames('data-grid-cell',
            { 'data-grid-cell__fixed': isFixed },
            `data-grid-cell--${cellType}`,
            {[`data-grid-cell--${cellFormat}`]: Boolean(cellFormat)},
            {[`data-grid-cell--align__${align}`]: Boolean(align)},

        )
    }

    render() {
        const { value = '', cellType, cellFormat = '', align } = this.props;

        return (
            <div className={this.getComponentClassNames()} style={this.getStyles()}>
                {
                    this.formatDataCell({value, type: cellType, format: cellFormat})
                }
            </div>
        )
    }
}