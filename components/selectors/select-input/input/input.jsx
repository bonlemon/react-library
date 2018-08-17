// React
import React from 'react';
import PropTypes from 'prop-types';

// Lybraries
import classNames from 'classnames';

// Styles
import './input.scss'

export default class Input extends React.Component {
    
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        validator: PropTypes.func,
    }
    
    static defaultProps = {
        disabled: false
    }

    state = {
        value: this.props.value ? this.props.value : ''
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.value !== nextProps.value){
            const value = nextProps.value !== null ? nextProps.value : '';
            this.setState({ value: value });
        }
    }

    getComponentClassNames(){
        const { className } = this.props;
        return ( 
            classNames(
                className ? className : '',
                'select-input__input'
            )
        ) 
    }

    handlerOnChange = (event) => {
        const { id, onChange, validator } = this.props;
        const { value } = event.target;

        const newValue = validator ? validator(value) : value;

        this.setState({ value: newValue })
        onChange ? onChange(id, newValue) : null;
    }


    render(){
        const { id, placeholder, disabled } = this.props;

        const classes = this.getComponentClassNames();
        const { value } = this.state;

        return(
            <input
                className={ classes }
                id={ id ? id : null }
                type='text'
                value={ value ? value : '' }
                placeholder={ placeholder }
                disabled={ disabled }
                onChange={ this.handlerOnChange }
            />
        );
    }
}