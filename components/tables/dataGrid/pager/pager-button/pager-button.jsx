import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './pager-button.scss';

export default class PagerButton extends Component {

    static propTypes = {
        value: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        type: PropTypes.string,
        disabled: PropTypes.bool,
        isActive: PropTypes.bool,
        onClickButton: PropTypes.func,
    }

    getComponentClasses() {
        const { type, disabled, isActive } = this.props;
        return classNames(
            'pager-button',
            `pager-button--${type}`,
            { 'pager-button--disabled': disabled },
            { 'pager-button--active': isActive }
        )
    }

    render() {

        const { value, type, disabled, onClickButton } = this.props;

        return (

            <div className="pager-button-container">
                <button
                    className={this.getComponentClasses()}
                    disabled={disabled}
                    onClick={onClickButton}
                    value={value}>
                    {
                        value
                    }
                </button>

            </div>
        )
    }
}
