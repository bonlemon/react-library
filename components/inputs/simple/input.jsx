/*eslint-disable*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './input.scss'


export default class Input extends Component {
    
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        type: PropTypes.oneOf([
            'text',
            'password',
            'tel',
            'number',
            'email'
        ]).isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
        size: PropTypes.oneOf([
            'small',
            'default',
            'large',
        ]).isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        validator: PropTypes.func,
        isRequired: PropTypes.bool, 
        name: PropTypes.string,
        label: PropTypes.string,
        tabIndex: PropTypes.number,
        pattern: PropTypes.string, 
        step: PropTypes.number,
        minLength: PropTypes.number, 
        maxLength: PropTypes.number,
        form: PropTypes.string,
        showClear: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onEnter: PropTypes.func,
        onClick: PropTypes.func,
    }
    
    static defaultProps = {
        value: '',
        type: 'text',
        size: 'default',
        disabled: false,
        readOnly: false,
        isRequired: false,
        showClear: false,
        onClick: () => {},
    }

    state = {
        value: this.props.value ? this.props.value : '',
        isValid: false,
        isFocused: false   
    }

    componentWillReceiveProps(nextProps){
        if (this.props.value !== nextProps.value) {
            const value = nextProps.value !== null ? nextProps.value : '';
            this.setState({ value: value });
        }
    }
    
    getComponentClassNames() {
        const { className, size, isRequired,type } = this.props;
        const { isValid, isFocused, value } = this.state;

        const status = isValid ? 'checked' : 'required';

        return {
            cover: classNames(
                className ? className : '',
                'input-cover',
            ),
            component: classNames( 
                'input-extended',
                size ? `input-extended--${size}` : '',
            ),
            input: classNames(
                'input-extended__elem',
                isRequired && !isFocused  ? `input-extended__elem--${status}` : '', 
                isFocused ? `input-extended__elem--focused` : ''
            ),
            field: classNames(
                'input-extended__field',
                size ? `input-extended__field--${size}` : '',
                type ? `input-extended__field--${type}` : '',
            ),
            clear: classNames(
                value.length ? `input-extended__clear` : '', 
                type == 'number' ? `input-extended__clear--${type}` : '',
            ),
            icon: classNames(
                'input-extended__icon',
                isRequired && !isFocused  ? `input-extended__icon--${status}` : '',
            )
        } 
    }

    handlerOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handlerOnEnter(event);
        }
    }

    handlerOnChange = (event) => {
        const { id, onChange, validator } = this.props;
        const { value } = event.target;

        const validate = validator ? validator(value) : value;
       
        const isValidLength = this.checkRequired(value);
        const isValidClass = isValidLength && event.target.matches(':valid');

        this.setState({ value: validate, isValid: isValidClass })

        onChange ? onChange({event, id, value, validate, isValid: isValidClass}) : null;
    }

    checkRequired(value) {
        return value.length != 0 && value.trim().length > 0; 
    }

    handlerOnEnter = (event) => {
        const { id, onEnter } = this.props;
        const { isValid, value } = this.state;

        onEnter ? onEnter({event, id, value, isValid}) : null;
    }

    handlerOnBlur = (event) => {
        const { id, onBlur } = this.props;
        const { value, isValid } = this.state;
        
        this.setState({ isFocused: false })
        
        onBlur ? onBlur({event, id, value, isValid}) : null;
    }

    handlerOnFocus = (event) => {
        const { id, onFocus } = this.props;
        const { value, isValid } = this.state;

        this.setState({ isFocused: true })

        onFocus ? onFocus({event, id, value, isValid}) : null;
    }

    handlerOnClick = event => {
        const {onClick} = this.props;
        onClick({event, state: this.state, props: this.props});
    }

    handlerClickClear = (event) => {
        const { id, onChange } = this.props;

        this.setState({ value: '', isValid: false })

        onChange ? onChange({event, id, value: '', isValid: false}) : null;
    }

    render() {
        const {
            id,
            type,
            placeholder,
            disabled,
            readOnly,
            label,
            name,
            min,
            max,
            tabIndex,
            pattern,
            step,
            minLength,
            maxLength,
            form,
            showClear,
            isRequired,
        } = this.props;
        
        const { value } = this.state;

        const classes = this.getComponentClassNames();

        return(
            <div className={classes.cover}>
                {label && <p className="input-cover__label">{ label }</p>}
                <div className={classes.component}>
                    <div className={ classes.input }>
                        <input
                            id={ id ? id : null }
                            className={ classes.field }
                            type={type}
                            min={ min }
                            max={ max }
                            step={ step  }
                            name={ name }
                            tabIndex={ tabIndex }
                            pattern={ pattern }
                            minLength={ minLength }
                            maxLength={ maxLength }
                            form={ form }
                            value={ value ? value : '' }
                            placeholder={ placeholder }
                            disabled={ disabled }
                            readOnly={readOnly}
                            onChange={ this.handlerOnChange }
                            onBlur={ this.handlerOnBlur }
                            onKeyPress={ this.handlerOnKeyPress }
                            onFocus={ this.handlerOnFocus }
                            onClick={this.handlerOnClick}
                        />
                        {showClear && <span onClick={this.handlerClickClear} className={classes.clear}></span>}
                    </div>
                    
                    {isRequired && <span className={classes.icon}></span>}
                </div>
            </div>
        );
    }
}