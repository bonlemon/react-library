import React, { Component } from 'react';
import PropTypes from 'prop-types';

import joinClasses from 'classnames';

import './data-card.scss';

export default class DataCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
  }

  getClassNames() {
    const {className} = this.props;
    return joinClasses(
      {[className]: Boolean(className)},
    )
  }

  render() {
    const {title} = this.props;

    return (
      <div className={`data-card ${this.getClassNames()}`}>
      {
        title ? 
          <div className="data-card__header">
            <div className="data-card__header__title">
              { title }
            </div>
          </div>
          :
          null
      }

        <div className="data-card__body">
          { this.props.children }
        </div>

        <div className="data-card__footer">

        </div>
      </div>
    )
  }
}
