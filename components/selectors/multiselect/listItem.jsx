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

    getComponentClassNames() {
        const { className, selected, size } = this.props;

        return {
            component: classNames(
                className ? className : '',
                'multi-select-list__item',
                selected ? `multi-select-list__item--selected` : '',
               
            )
        }
    }

    handlerOnClick = () => {
        const { id, label, onClick } = this.props;
      
        const selected = {
            id,
            label
        }

        onClick ? onClick(selected) : null;
    }

    render() {
        const classes = this.getComponentClassNames();

        const { id, label, selected, isCheckBoxes } = this.props;

        return (
            <span className={classes.component} onClick={this.handlerOnClick} >
                <Checkbox className="b-list-item__checkbox" checked={selected} />
                {label}
            </span>
        );
    }
}
