/*eslint-disable*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import SelectedItem from './selectItem';
import DataList from './dataList';

import './multi-select.scss'


export default class MultiSelect extends Component {
    constructor(props) {
        super(props);

        const { value, selected, list, placeholder } = this.props;

        this.multiselect = React.createRef();
        this.input = React.createRef();

        this.state = {
            value: value ? value : '',
            isHidden: true, // отображение списка
            selected: selected ? selected : [], // выбранные элементы
            filtered: selected ? this.sortItems(list, selected) : list, // отфильтрованный список
            placeholder: placeholder ?  placeholder : "",
            isFocused: false 
        }
    }

     static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        size: PropTypes.oneOf([
            'default',
            'large',
        ]).isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string,
            label: PropTypes.string.isRequired
        })).isRequired, 
        disabled: PropTypes.bool, 
        limit: PropTypes.number,
        label: PropTypes.string, 
        name: PropTypes.string, 
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onEnter: PropTypes.func,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        value: '',
        size: 'default',
        disabled: false,
        limit: 99,
        //selected: [],
        list: [],
        onClick: () => {},
    }

    componentDidMount() {
        document.addEventListener('click', this.handlerOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handlerOutsideClick);
    }

    getComponentClassNames() {
        const { className, size } = this.props;
        const { isValid, isFocused, value } = this.state;

        return {
            wrapper: classNames(
                className ? className : '',
                'multi-select',
            ),
            component: classNames( 
                size ? `multi-select--${size}` : '',
            ),
            input: classNames(
                "multi-select__input",
                isFocused ? 'multi-select__input--focused' : '',
                size ? `multi-select__input--${size}` : ''
            )
    
        } 
    }

    sortItems(filtered, selected) {

        const unSelected = filtered.sort((a,b) => {
            return a.id - b.id;
        }).filter((item) => {
            return selected.indexOf(item.id) === -1;
        })

        const selectedItems = filtered.filter((item) => {
            return selected.indexOf(item.id) !== -1;
        })

        return [...selectedItems, ...unSelected]
    }

    handlerOnCheck = (item) => {
        const { value, selected, filtered } = this.state;
        const { id, list, limit, disabled, onChange } = this.props;

        let selectedIds = [...selected];

        if(!disabled) {
            if(selectedIds.indexOf(item.id) !== -1) {
                selectedIds.splice(selectedIds.indexOf(item.id), 1)
            }
            else {
                if(limit === selectedIds.length) {
                    selectedIds.splice(selectedIds.indexOf(item.id), 1)
                    selectedIds.push(item.id);
                }
                else {
                    selectedIds.push(item.id);
                }
            }

            const sortedList = this.sortItems(filtered, selected);

            this.setState({
                filtered: sortedList,
                selected: selectedIds
            });

            onChange ? onChange({event, id, value, selected}) : null;
        }
    }

    handlerOnKeyPress = (event) => {
        const { list, id, onEnter } = this.props;
        const { selected } = this.state;
        
        if (event.key === 'Enter') {
            this.input.current.blur();

            onEnter && onEnter({event, id, value, selected});
        }
    }

    handlerOnChange = (event) => {
        const { filtered, selected } = this.state;
        const { list, id, onChange } = this.props;
        const value = event.target.innerText;

        const filteredList = list.filter((item) => {
            return item.label.toLowerCase().indexOf(value.toLowerCase())!== -1;
        });  

        const sortedList = this.sortItems(filteredList, selected);

        this.setState({filtered: sortedList, value});
        
        onChange ? onChange({event, id, value, selected}) : null;

        this.input.current.style.width = 'auto';
        this.input.current.style.width =  this.input.current.scrollWidth + 5 + 'px';
    }

    handlerOutsideClick = (event) => {
        if(event.target 
            && !this.multiselect.current.contains(event.target)) {
            this.setState({isHidden: true})
        }
        else {
            this.setState({isHidden: false})
        }
    }

    handlerClickOnInput = (event) => {
        this.input.current.focus();
    }

    handlerOnFocus = (event) => {
        const { id, onFocus } = this.props;
        const { value, isFocused, selected } = this.state;

        this.setState({ isFocused: true, isHidden: false })

        onFocus ? onFocus({event, id, value, selected}) : null;
    }

    handlerOnBlur = (event) => {
        const { id, onBlur } = this.props;
        const { value, isFocused, selected } = this.state;

        this.setState({ isFocused: false })

        onBlur ? onBlur({event, id, value, selected}) : null;
    }


    render() {
        const { id, size, list, disabled, label, name, tabIndex } = this.props;    
        const { value, isHidden, selected, filtered, placeholder } = this.state;

        const classes = this.getComponentClassNames();

        const selectedItems = list.filter((item) => selected.indexOf(item.id) !== -1);

        return(
            <div className={classes.wrapper}>
                { label && <p className="multi-select-cover__label">{ label }</p> }
                <div className={ classes.component } ref={this.multiselect}>
                    <div onClick={this.handlerClickOnInput} ref={this.multiselect} className={classes.input} > 
                        <ul className="multi-select__input__selected-list">
                                {
                                    selectedItems.map((item) => {
                                        return <SelectedItem 
                                            key={ item.id } 
                                            item={ item } 
                                            handlerOnRemove={ this.handlerOnCheck }/>;
                                    })
                                }
                            <li style={{margin: "auto 4px"}}>
                                <div
                                    id={ id ? id : null }
                                    ref={this.input}
                                    className="multi-select__input__elem"
                                    name={ name }
                                    contentEditable={ !disabled ? "true" : "false" }
                                    tabIndex={ tabIndex }                                
                                    innertext={ value ? value : '' }
                                    placeholder={ selectedItems.length ? "" : placeholder}                                
                                    onInput={ this.handlerOnChange } 
                                    onFocus={ this.handlerOnFocus }
                                    onBlur={ this.handlerOnBlur } 
                                    onKeyPress={ this.handlerOnKeyPress } >
                                </div>
                            </li>
                        </ul> 
                    </div>
                    { 
                        !isHidden && !disabled && <DataList 
                            list={ filtered } 
                            selected={selected} 
                            onCheck={ this.handlerOnCheck }
                        /> 
                    }
                </div>
            </div>
        );
    }
}