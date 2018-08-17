/*eslint-disable*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import DataList from './dataList';

import './select.scss'


export default class Select extends Component {
    constructor(props) {
        super(props);
        this.sel = React.createRef();

        const { selected, placeholder, list } = this.props;

        this.state = {
            value:  selected ? this.getSelectedObject().label : "",
            selected: selected ? this.getSelectedObject() : null,
            isHidden: true, // отображение списка
            placeholder: placeholder ? placeholder : "",
            filtered: list ? list : [], // отфильтрованный список
            isValid: selected !== null,
        }
    }

    

    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        size: PropTypes.oneOf([
            'small',
            'default',
            'large',
        ]).isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired
        })).isRequired,
        tabIndex: PropTypes.string, 
        search: PropTypes.bool.isRequired,
        disabled: PropTypes.bool, 
        label: PropTypes.string, 
        name: PropTypes.string, 
        placeholder: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        value: '',
        size: 'default',
        disabled: false,
        selected: null,
        search: false,
        list: [],
        onChange: () => {},
    }

    getSelectedObject() {
        let selectedItem;

        if(typeof this.props.selected == "object") {
            selectedItem = this.props.selected;
        } 
        else {
            this.props.list.map((item) => {
                if(this.props.selected === item.id) {
                    selectedItem = item;
                }
            })
        }

        return selectedItem;
    }

    componentDidMount() {
        document.addEventListener('click', this.handlerOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handlerOutsideClick);
    }

    getComponentClassNames() {
        const { className, size, isRequired } = this.props;
        const { isValid, isFocused, value, isHidden } = this.state;

        const status = isValid ? 'checked' : 'required';

        return {
            wrapper: classNames(
                className ? className : '',
                'select',
            ),
            input: classNames(
                "select__input",
                !isHidden ? 'select__input--focused' : '',
                size ? `select__input--${size}` : '',
                isRequired && !isFocused  ? `select__input--${status}` : '', 
            ),
            icon: classNames(
                "select__icon",
                isHidden ? 'select__icon--open' : 'select__icon--close'
            ),
            iconValid: classNames(
                'select__icon-valid',
                isRequired && !isFocused  ? `select__icon-valid--${status}` : '',
            )
        } 
    }

    handlerOnCheck = (event, item) => {
        const { selected } = this.state;
        const { id, onChange } = this.props;
        let selectedItem;
        
        if(selected && item.id == selected.id) {
            selectedItem = null;        
        }
        else {
            selectedItem = item;
        } 
        
        const isValid = selectedItem !== null;

        this.setState({selected: selectedItem, isValid});
        onChange && onChange({event, id, selected: selectedItem});     
    }

    handlerOnChange = (event) => {
        const { filtered, selected } = this.state;
        const { list, id, onChange } = this.props;
        const { value } = event.target;

        const filteredList = list.filter((item) => {
            return item.label.toLowerCase().indexOf(value.toLowerCase())!== -1;
        });  

        this.setState({filtered: filteredList, value});
    }

    handlerOutsideClick = (event) => {
        const { selected } = this.state;

        if(event.target && !this.sel.current.contains(event.target)) {
            this.setState({
                isHidden: true, 
                value: selected ? selected.label : ""
            })
        }
    }

    handlerClickOnInput = (event) => {
        const { list } = this.props;

        if(event.target && this.sel.current.contains(event.target)) {
            this.setState({
                isHidden: !this.state.isHidden, 
                value: "", 
                filtered: list 
            })
        }
    }

    render() {
        const { id, list, disabled, search, label, name, tabIndex, isRequired } = this.props;    
        const { value, isHidden, selected, filtered, placeholder } = this.state;

        const classes = this.getComponentClassNames();

        return(
            <div className={classes.wrapper} >
                { label && <p className="select-cover__label">{ label }</p> }
                <div className="select-flex">
                    <div className="select-selection" onClick={ !disabled && this.handlerClickOnInput} ref={this.sel}>
                        <input
                            id={ id ? id : null }
                            className={ classes.input }
                            placeholder={ selected ? selected.label : placeholder }                            
                            disabled={ !search }
                            onChange={ this.handlerOnChange }
                            value={ value }
                            name={ name }
                            tabIndex={ tabIndex }
                            autoComplete="off"
                            
                        />
                        
                        <span className={ classes.icon } ></span>
                        { 
                        !isHidden && <DataList 
                            list={ filtered } 
                            selected={ selected } 
                            onCheck={ this.handlerOnCheck }
                        /> 
                    }
                    </div>
                    {isRequired && <span className={classes.iconValid}></span>}
                </div>
            </div>
        );
    }
}