import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Lybraries
import classNames from 'classnames';

// Styles
import './button-icon.scss';

export default class ButtonIcon extends Component {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
        flag: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };
    static defaultProps = {
        type: 'flat',
        iconPadding: 'left',
        disabled: false,
    };

    getComponentClassNames() {
        // get classnames and type
        const { className, disabled, type, iconPadding, label } = this.props;
        return {
            component: classNames(
                className ? className : '',
                'b-button-icon',
                type ? `b-button-icon--${type}` : '',
                disabled ? 'b-button-icon--disabled' : '',
            ),
        };
    }
    handlerOnClick = event => {
        //get onChange action
        const { onClick, id, value, flag } = this.props;

        // if onClick exists -> execute
        onClick ? onClick(event, id, value, flag) : null;
    };

    render() {
        // get classes
        const classes = this.getComponentClassNames();

        // get props
        const { id, disabled, label, icon, iconPadding, url, type, hintHover } = this.props;
        const iconElement =
            icon && type === 'primary'
                ? React.cloneElement(icon, {
                      color: '#fff',
                      key: `iconElement-${iconPadding}`,
                  })
                : icon;
        return url ? (
            <Link to={url} className="b-button-icon--link">
                <button id={id} className={classes.component} onClick={this.handlerOnClick} disabled={disabled}>
                    {iconPadding === 'left' && iconElement}
                    {label ? label : null}
                    {iconPadding === 'right' && iconElement}
                </button>
                )
            </Link>
        ) : (
            <button id={id} className={classes.component} onClick={this.handlerOnClick} disabled={disabled}>
                {iconPadding === 'left' && iconElement}
                {label ? label : null}
                {iconPadding === 'right' && iconElement}
            </button>
        );
    }
}
