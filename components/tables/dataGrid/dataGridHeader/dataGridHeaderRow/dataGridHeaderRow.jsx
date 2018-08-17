import React, { Component } from 'react';

import classNames from 'classnames';

import './dataGridHeaderRow.scss';

export default class DataGridHeaderRow extends Component {

    getComponentClassNames = () => {
        const { type } = this.props;
        return classNames('data-grid-header-row',{'data-grid-header-filter-row': type == 'filter'});
    }

    getStyles() {
        const {styles} = this.props;
    }

    render() {
        const {height, styles} = this.props;
        return (
            <div className={this.getComponentClassNames()} style={styles}>
                {this.props.children}
            </div>
        )
    }
}