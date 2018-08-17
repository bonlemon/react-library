//** IMPORTS **//

// React
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Library's
import classNames from 'classnames'
// Styles
import './workarea.scss';
// Components
import Responsive from '@library/components/layouts/responsive';
import Divider from '@library/components/layouts/divider';
import ColumnLayout from '@library/components/layouts/column-layout'



//** COMPONENT **//

export default class Workarea extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
        justify: PropTypes.oneOf(['left', 'center', 'right']),
    }

    static defaultProps = {
        justify: 'left'
    }

    getComponentClassNames() {
        const { className } = this.props;
        return classNames(
            'b-workarea',
            { [className]: Boolean(className) },
        )
    }

    render() {
        const { justify, children } = this.props;
        return (
            <Responsive 
                className={this.getComponentClassNames()}
                justify={justify}
                height
            >
                {children}
            </Responsive>
        )
    }
}
