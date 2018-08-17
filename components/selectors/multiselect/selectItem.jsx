import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Checkbox from './checkBox';

import "./listItem.scss";

export default class ListItem extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onClick: PropTypes.func,
        isCheckBoxes: PropTypes.bool
    }

    static defaultProps = {
        id: 'list-item-id',
        label: 'Лейбл не задан',
        selected: false
    }

    handlerOnRemove = () => {
        const { item, handlerOnRemove } = this.props;
 
        handlerOnRemove ? handlerOnRemove(item) : null;
    }

    render() {
        const { item } = this.props;

        return (
            <li className="multi-select__input__selected-list__item">
                <p className="multi-select__input__selected-list__item__label">{item.name ? item.name : item.label.substring(0,8)} </p>
                <span className="multi-select__input__selected-list__item__remove" onClick={this.handlerOnRemove}>&#215;</span>
            </li>
        );
    }
}
