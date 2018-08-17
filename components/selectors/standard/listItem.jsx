import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import "./listItem.scss";

export default class ListItem extends React.Component {

    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        onClick: PropTypes.func
    }

    static defaultProps = {
        id: 'list-item-id',
        label: 'Лейбл не задан',
        selected: false
    }

    getComponentClassNames() {
        const { className, selected, size } = this.props;

        return {
            component: classNames(
                className ? className : '',
                'select-list__item',
                selected ? `select-list__item--selected` : '',
               
            )
        }
    }

    handlerOnClick = (event) => {
        const { id, label, onClick } = this.props;
      
        const selected = {
            id,
            label
        }

        onClick ? onClick(event, selected) : null;
    }

    render() {
        const classes = this.getComponentClassNames();

        const { id, label } = this.props;

        return (
            <span className={classes.component} onClick={this.handlerOnClick} >
                {label}
            </span>
        );
    }
}
