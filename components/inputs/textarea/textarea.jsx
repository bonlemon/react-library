import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './textarea.scss'


export default class Textarea extends React.Component {
    
    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        value: PropTypes.string,
        rows: PropTypes.number.isRequired,
        cols: PropTypes.number,
        name: PropTypes.string,
        showClear: PropTypes.bool,
        isRequired: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyPress: PropTypes.func,
        onFocus: PropTypes.func,
        onEnter: PropTypes.func,
        autofocus: PropTypes.bool,
        form: PropTypes.string,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        wrap: PropTypes.oneOf([
            'hard',
            'soft',
            'off'
        ])
    }
    
    static defaultProps = {
        value: '',
        type: 'text',
        disabled: false,
        isRequired: false,
        showClear: false
    }

    state = {
        value: this.props.value ? this.props.value : '',
        isValid: this.props.value && this.checkRequired(this.props.value),
        isFocused: false   
    }

    // componentWillReceiveProps(nextProps){
    //     if (this.props.value !== nextProps.value) {
    //         const value = nextProps.value !== null ? nextProps.value : '';
    //         this.setState({ value: value });
    //     }
    // }

    static getDerivedStateFromProps(props, state){
        if (props.value != state.value) {
            const value = props.value !== null ? props.value : '';
            return value
        } else {
            return null
        }
    }
    
    getComponentClassNames() {
        const { className, isRequired } = this.props;
        const { isValid, isFocused, value } = this.state;

        const status = isValid ? 'checked' : 'required';

        return {
            cover: classNames(
                className ? className : '',
                'textarea-cover',
            ),
            component: classNames( 
                'textarea-extended'
            ),
            textarea: classNames(
                'textarea-extended__elem',
                isRequired && !isFocused  ? `textarea-extended__elem--${status}` : '', 
                isFocused ? `textarea-extended__elem--focused` : ''
            ),
            field: classNames(
                'textarea-extended__field'
            ),
            clear: classNames(
                value.length ? `textarea-extended__clear` : ''
            ),
            icon: classNames(
                'textarea-extended__icon',
                isRequired && !isFocused  ? `textarea-extended__icon--${status}` : '',
            )
        } 
    }

    handlerOnKeyPress = (event) => {
        const { id, onKeyPress } = this.props;
        const { value } = event.target;
        const { isValid } = this.state;

        if (event.key === 'Enter') {
            this.handlerOnEnter(event);
        }
        else {
            onKeyPress ? onKeyPress({event, id, value, isValid}) : null;
        }
    }

    handlerOnEnter(event){
        const { id, onEnter } = this.props;
        const { isValid } = this.state;
        const { value } = event.target;

        onEnter ? onEnter({event, id, value, isValid}) : null;
    }


    handlerOnChange = (event) => {
        const { id, onChange } = this.props;
        const { value } = event.target;

        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';

        const isValid = this.checkRequired(value);
        this.setState({ value: value, isValid: isValid})
        
        onChange ? onChange({event, id, value, isValid}) : null;
    }

    checkRequired(value) {
        return value.length != 0 && value.trim().length > 0; 
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

    handlerClickClear = (event) => {
        const { id, onChange } = this.props;

        event.target.previousSibling.style.height = 'auto';

        this.setState({ value: '', isValid: false })

        onChange ? onChange({event, id, value: '', isValid: false}) : null;
    }

    render() {

        const {
            id,
            placeholder,
            disabled,
            label,
            rows,
            cols,
            name,
            showClear,
            minLength,
            maxLength,
            isRequired,
            autofocus,
            form,
            wrap
        } = this.props;
        
        const { value } = this.state;

        const classes = this.getComponentClassNames();

        return(
            <div className={classes.cover}>
                {label && <p className="textarea-cover__label">{ label }</p>}
                <div className={classes.component}>
                    <div className={ classes.textarea }>
                        <textarea
                            className={ classes.field }
                            id={ id }
                            value={ value }
                            rows={ rows }
                            cols={ cols }
                            name={ name }
                            placeholder={ placeholder }
                            disabled={ disabled }
                            autoFocus={ autofocus }
                            form={ form }
                            wrap={ wrap }
                            minLength={ minLength }
                            maxLength={ maxLength }
                            onChange={ this.handlerOnChange }
                            onBlur={ this.handlerOnBlur }
                            onFocus={ this.handlerOnFocus }
                            onKeyPress={ this.handlerOnKeyPress }
                        ></textarea>
                        {showClear && <span onClick={this.handlerClickClear} className={classes.clear}></span>}
                    </div>  
                    {isRequired && <span className={classes.icon}></span>}
                </div>
            </div>
        );
    }
}