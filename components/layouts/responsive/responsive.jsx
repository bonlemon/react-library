import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './responsive.scss'

export default class Responsive extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
        justify: PropTypes.oneOf(['left', 'center', 'right']),
        width: PropTypes.bool,
        height: PropTypes.bool,
        noWrap: PropTypes.bool
    }

    static defaultProps = {
        justify: 'left'
    }

    getComponentClassNames() {
        const { justify, width, height, noWrap, className } = this.props;
        return classNames(
            'b-responsive',
            `b-responsive--${justify}`,
            { ['b-responsive--full-width']: Boolean(width) },
            { ['b-responsive--full-height']: Boolean(height) },
            { ['b-responsive--no-wrap']: Boolean(noWrap) },
            { [className]: Boolean(className) },
        )
    }

    handlerOnClick = () => {
        const { onClick } = this.props;
        onClick && onClick()
    }

    render() {
        const { children } = this.props;
        return (
            <div className={this.getComponentClassNames()} onClick={this.handlerOnClick}>
                {children}
            </div>
        )
    }
}
