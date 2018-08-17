import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './header-button.scss';


export default class HeaderButton extends PureComponent {
    static propTypes = {

    }

    static defaultProps = {
        onClick: () => {}
    }

    getClassNames() {
        const {type} = this.props;
        return classNames(
            'header-button',
            `header-button--${type}`
        )
    }

    render() {
        const {value, type, icon, onClick} = this.props;
        return (
            <div className="header-button__container">
                <button className={this.getClassNames()} onClick={onClick}>
                {
                    value
                }
                </button>
            </div>
        )
    }
}
