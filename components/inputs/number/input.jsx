/*eslint-disable*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './input.scss'
import cardReducer from 'medx/reducers/card';


export default class Input extends Component {
    
    static propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
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
        digital: PropTypes.bool.isRequired,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        isRequired: PropTypes.bool, 
        name: PropTypes.string,
        label: PropTypes.string,
        tabIndex: PropTypes.number,
        step: PropTypes.number,
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
        step: 1,
        type: 'text',
        size: 'default',
        digital: false,
        disabled: false,
        readOnly: false,
        isRequired: false,
        showClear: false,
        onClick: () => {},
    }

    state = {
        value: this.props.value ? this.props.value : 0,
        isValid: false,
        isFocused: false   
    }

    componentDidMount() {
        document.addEventListener('click', this.handlerOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handlerOutsideClick);
    }

    getComponentClassNames() {
        const { className, size, isRequired, showClear } = this.props;
        const { isValid, isFocused, value } = this.state;

        const status = isValid ? 'checked' : 'required';

        return {
            wrapper: classNames(
                className ? className : '',
                'input-number-wrapper',
            ),
            component: classNames( 
                'input-number',
                size ? `input-number--${size}` : '',
            ),
            input: classNames(
                'input-number__elem',
                isRequired && !isFocused  ? `input-number__elem--${status}` : '', 
                isFocused ? `input-number__elem--focused` : ''
            ),
            field: classNames(
                'input-number__field',
                size ? `input-number__field--${size}` : '',
                showClear ? `input-number__field--length` : ''
            ),
            clear: classNames(
               "input-number__btn",
                value !== 0 ? `input-number__btn--clear` : ''
            ),
            icon: classNames(
                'input-number__icon',
                isRequired && !isFocused  ? `input-number__icon--${status}` : '',
            )
        } 
    }

    handlerOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handlerOnEnter(event);
        }
    }

    handlerOnKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            this.handlerIncrease(event);
        }
        if (event.key === 'ArrowDown') {
            this.handlerDecrease(event);
        }
    }

    handlerOnChange = (event) => {
        const { id, onChange } = this.props;
        const { value } = event.target;

        let validate = value.replace(/[^\d.]*/g, '').replace(/([.])[.]+/g, '$1');

        const isValid = this.checkRequired(validate);

        this.setState({ value: validate, isValid })

        onChange ? onChange({event, id, value: validate, isValid}) : null;
    }

    checkRequired(value) {
        return value > 0; 
    }

    handlerIncrease = (event) => {
        const { id, step, onChange } = this.props;
        const { value } = this.state;

        let valueNumber = Number(value) + step;
        valueNumber = Math.round(valueNumber * 100) / 100;

        const isValid = this.checkRequired(valueNumber);

        this.setState({ value: valueNumber, isValid, isFocused: true});

        onChange && onChange({event, id, value: valueNumber, isValid});
    }

    handlerDecrease = () => {
        const { id, step, onChange } = this.props;
        const { value } = this.state;

        let valueNumber = Number(value) - step;
        valueNumber = Math.round(valueNumber * 100) / 100;

        const isValid = this.checkRequired(valueNumber);

        this.setState({ value: valueNumber, isValid, isFocused: true });

        onChange && onChange({event, id, value: valueNumber, isValid});
    }

    handlerOnEnter = (event) => {
        const { id, onEnter } = this.props;
        const { isValid, value } = this.state;

        onEnter ? onEnter({event, id, value, isValid}) : null;
    }

    handlerOnBlur = (event) => {
        const { id, onBlur } = this.props;
        const { value, isValid } = this.state;
        
        const validate = (typeof value != 'number') ? Number(value.replace(/[^\d.]*/g, '')
            .replace(/([.])[.]+/g, '$1')) : value;

        this.setState({ isFocused: false, value: !isNaN(validate) ? validate : 0 })
        
        onBlur ? onBlur({event, id, value: validate , isValid}) : null;
    }

    handlerOnFocus = (event) => {
        const { id, onFocus } = this.props;
        const { value, isValid } = this.state;

        this.setState({ isFocused: true })

        onFocus ? onFocus({event, id, value, isValid}) : null;
    }

    handlerOnClick = event => {
        const { onClick } = this.props;

        onClick && onClick({event, state: this.state, props: this.props});
    }

    handlerClickClear = (event) => {
        const { id, onChange } = this.props;

        this.setState({ value: 0, isValid: false })

        onChange ? onChange({event, id, value: 0, isValid: false}) : null;
    }

    handlerOutsideClick = (event) => {
        if(event.target 
            && !event.target.classList.contains('input-number__field')
            && !event.target.classList.contains('input-number__arrows--up')
            && !event.target.classList.contains('input-number__arrows--down')) {
            this.setState({isFocused: false})
        }
    }

    render() {
        const {
            id,
            placeholder,
            disabled,
            readOnly,
            label,
            name,
            min,
            max,
            tabIndex,
            step,
            form,
            showClear,
            isRequired,
            digital
        } = this.props;
        
        const { value } = this.state;

        const classes = this.getComponentClassNames();

        let formatedValue = digital ? new Intl.NumberFormat("ru").format(value) : value; 

        return(
            <div className={classes.wrapper}>
                {label && <p className="input-number-wrapper__label">{ label }</p>}
                <div className={classes.component}>
                    <div className={ classes.input }>
                        <input
                            id={ id ? id : null }
                            className={ classes.field }
                            type="text"
                            min={ min }
                            max={ max }
                            step={ step  }
                            name={ name }
                            tabIndex={ tabIndex }
                            form={ form }
                            value={ formatedValue }
                            placeholder={ placeholder }
                            disabled={ disabled }
                            readOnly={readOnly}
                            onChange={ this.handlerOnChange }
                            onBlur={ this.handlerOnBlur }
                            onKeyPress={ this.handlerOnKeyPress }
                            onKeyDown={ this.handlerOnKeyDown }
                            onFocus={ this.handlerOnFocus }
                            onClick={this.handlerOnClick}
                        />
                        {showClear && <span onClick={this.handlerClickClear} className={classes.clear}></span>}
                        <div className="input-number__arrows">
                            <span onClick={ !disabled && this.handlerIncrease } className="input-number__arrows--up"></span>
                            <span onClick={ !disabled && this.handlerDecrease } className="input-number__arrows--down"></span>
                        </div>
                    </div>                    
                    {isRequired && <span className={classes.icon}></span>}
                </div>
            </div>
        );
    }
}