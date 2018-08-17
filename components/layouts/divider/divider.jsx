import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import joinClasses from 'classnames'

import './divider.scss'


export default class Divider extends PureComponent {
  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    visible: PropTypes.bool,
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 1
  }

  getClassNames() {
      const {vertical, horizontal, visible, size} = this.props;

      return joinClasses(
          'divider',
          {'divider--vertical': vertical},
          {[`divider--${size}x`]: Boolean(size)},
        
          {'divider--horizontal': horizontal},
          {['divider--visible']: visible}, // todo
      )
  }


  render() {
    return (
      <div className={this.getClassNames()}></div>
    )
  }
}
