import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './control.scss'


export default class CheckboxControl extends React.Component {

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        checked: PropTypes.bool.isRequired
    }

    static defaultProps = {
        checked: false
    }

    getComponentClassNames() {
        const { className, checked } = this.props;

        return { 
            component: classNames(
                className ? className : '',
                checked ? 'select-list__item__checkbox__control--checked' : ''
            )
        } 
    }

    render() {
        const { id } = this.props;

        const classes = this.getComponentClassNames();

        return(
            <span id={id} className={ classes.component } ></span>
        );
    }
}

