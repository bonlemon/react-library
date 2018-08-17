// React
import React from 'react';
import PropTypes from 'prop-types';

// Lybraries
import classNames from 'classnames';

// Styles
import './select-input.scss';

// Components
import Input from './input';
import DataList from './list';
import Tooltip from '@library/components/tooltip';

export default class SelectInput extends React.Component {
    constructor(props) {
        super(props);

        this.select = React.createRef();
        this.selInput = React.createRef();
    }

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        size: PropTypes.oneOf(['full', 'half']).isRequired,
        disabled: PropTypes.bool,
        list: PropTypes.array.isRequired,
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        validator: PropTypes.func,
        selected: PropTypes.object,
        selectDisabled: PropTypes.bool,
        inputDisabled: PropTypes.bool
    }

    static defaultProps = {
        selected: null
    }

    state = {
        show: false,
        selected: this.props.selected,
        value: ""
    }

    componentDidMount() {
        const { onChange, selected } = this.props;
        selected && this.handlerOnCheck(this.props.selected);
    }

    getComponentClassNames() {
        const { className, size } = this.props;

        return ( 
            classNames(
                className ? className : '',
                'select-input',
                {[`select-input--${size}`]: Boolean(size)}
            )
        ) 
    }

    showSelectOptions() {
		this.setState({
			show: true
		});
		document.body.addEventListener('click', this.handlerOutsideClick);
    }
    
    hideSelectOptions() {           
		this.setState({
			show: false
		});
		document.body.removeEventListener('click', this.handlerOutsideClick);
	}

    handlerClickOnInput = (e) => {
        const { show } = this.state;
  
        if(this.selInput.current.contains(e.target)) {  
            show ? this.hideSelectOptions() : this.showSelectOptions();
        }
    }

    handlerOutsideClick = (e) => {
        if (!this.select.current.contains(e.target) 
            && !e.target.classList.contains("select-input-list__item")) {
			this.hideSelectOptions();
		}
    }

    handlerOnCheck = (selected) => {
        const { value } = this.state;
        const { onChange } = this.props;

        let data = `${selected.label}  ${value}`;
    
        this.setState({ selected: selected });
        onChange ? onChange(data) : null;

        this.hideSelectOptions();
    }

    handlerOnChange = (id, value) => {
        const { selected } = this.state;
        const { onChange } = this.props;

        const label = selected ? selected.label : '';
        const data = `${label} / ${value}`;

        this.setState({ value: value });
        onChange ? onChange(data) : null;
    }

    render(){
        const { show, selected } = this.state;
        const { placeholder, selectDisabled, inputDisabled, list, id, label, validator } = this.props;

        const classes = this.getComponentClassNames();

		return (
            <div className={classes} ref={this.selInput}>
                <span className="select-input__label">{ label }</span>
                <div id={ id } className="select-input__body"  >
                    <div className="select-input__cover">
                        <Tooltip className="select-input__tooltip" value={selected && selected.label} position="top">
                            <div className="select-input__sel" ref={this.select} onClick={ !selectDisabled ? this.handlerClickOnInput : null }>
                                <Input 
                                    id={`first-${id}`}
                                    className="select-input__sel-elem"
                                    value={  selected && selected.label } 
                                    placeholder=""
                                    disabled={ true }  
                                />
                            </div>
                        </Tooltip>
                        <Input 
                            id={`second-${id}`} 
                            className="select-input__inp-elem"
                            value={  null } 
                            placeholder={ placeholder } 
                            validator={validator}
                            disabled={ inputDisabled } 
                            onChange={this.handlerOnChange} 
                        />
                    </div>
                    
                    {
                        show 
                            ? <DataList 
                                    id={ id }  
                                    list={list ? list : []} 
                                    selected={selected} 
                                    onCheck={ this.handlerOnCheck } 
                                /> 
                            : null
                    }
                </div>
            </div>
	    );
    }
}


