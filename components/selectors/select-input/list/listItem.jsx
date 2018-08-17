// React
import React from 'react';
import PropTypes from 'prop-types';

// Lybraries
import classNames from 'classnames';

// Styles
import './listItem.scss';


export default class ListItem extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        selected: PropTypes.bool,
        id: PropTypes.number,
        label: PropTypes.string,
        onClick: PropTypes.func,
    }

    getComponentClassNames() {
        const { className, selected } = this.props;
        return (
            classNames(
                className ? className : '',
                'select-input-list__item',
                selected ? `select-input-list__item--selected` : ''
            )
        )
    }

	handlerOnClick = (e) => {
        const { id, label, onClick } = this.props;
        e.preventDefault();

        const selected = {
            id,
            label
        }

	    onClick ? onClick(selected) : null;
	}

    render(){
        const { label } = this.props;
        const classes = this.getComponentClassNames();
    
		return (
            <span className={ classes } onClick={ this.handlerOnClick } >
                { label }
            </span>
	    );
    }
}


