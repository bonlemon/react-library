//** IMPORTS **//

// React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Styles
import './overlay.scss';

// Components
import Responsive from '@library/components/layouts/overlay';



//** COMPONENT **//

export default class Overlay extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
    }

    handlerOnClick = () => {
        const { onClick } = this.props;
        onClick && onClick()
    }

    render() {
        const { children } = this.props;
        return (
            <Responsive
                className="b-overlay"
                width
                height
                onClick={this.handlerOnClick}
            >
                {children}
            </Responsive>
        )
    }
}