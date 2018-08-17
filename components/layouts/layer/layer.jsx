//** IMPORTS **//

// React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Library's
import classNames from 'classnames';

// Styles
import './layer.scss';



//** COMPONENT **//

export default class Layer extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
        type: PropTypes.oneOf([
            'app',
            'dropdown',
            'popover',
            'overlay',
            'full-screen',
            'sticky'
        ]).isRequired,
    }

    static defaultProps = {
        type: 'app'
    }

    getComponentClassNames() {
        const { className, type } = this.props;
        return classNames(
            'b-layer',
            `b-layer--${type}`,
            { [className]: Boolean(className) },
        )
    }

    render() {
        const { children } = this.props;
        return (
            <div className={this.getComponentClassNames()}>
                { children}
            </div>
        )
    }
}