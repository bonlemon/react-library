import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActionPanel from './action-panel';

import { calcGridWidth, correctRusCase } from '../utils';

import './toolbar.scss';

export default class DataGridToolbar extends Component {
  static propTypes = {
    selectedRows: PropTypes.instanceOf(Set),
    columnsMetrics: PropTypes.array,
    componentForActionPanel: PropTypes.object,
  }

  getSelectedRowsCountMessage() {
    const { selectedRows } = this.props;
    const cStr = correctRusCase(selectedRows.size, 'запись', 'записи', 'записей');
    return selectedRows.size > 0 && `Выбрано: ${selectedRows.size} ${cStr}`;
  }

  getToolbarStyles() {
    const { columnsMetrics } = this.props;
    if (columnsMetrics && columnsMetrics.length > 0) {
      return { 'maxWidth': calcGridWidth(columnsMetrics) }
    }
  }

  render() {
   
    const { componentForActionPanel, selectedRows } = this.props;
    return (
      <div
        className="data-grid-toolbar"
        style={this.getToolbarStyles()}>
        <div className="data-grid-toolbar-left-section">
          {componentForActionPanel && componentForActionPanel.left ?
            <ActionPanel
              component={componentForActionPanel.left}
              position={'left'}
              data={selectedRows} />
            :
            <span>{this.getSelectedRowsCountMessage()}</span>
          }
        </div>

        <div className="data-grid-toolbar-center-section">
          {componentForActionPanel && componentForActionPanel.center ?
            <ActionPanel
              component={componentForActionPanel.center}
              position={'center'}
              {...this.props}
            />
            :
            null
          }
        </div>

        <div className="data-grid-toolbar-right-section">
          {componentForActionPanel && componentForActionPanel.right ?
            <ActionPanel
              component={componentForActionPanel.right}
              position={'right'}
              {...this.props} />
            :
            null
          }
        </div>

      </div>
    )
  }
}
