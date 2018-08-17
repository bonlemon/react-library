import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './checkBox.scss';

import CheckboxControl from './control.jsx';

export default class Checkbox extends React.Component {
    constructor(props){
        super(props);

        const { checked } = this.props;

        this.state = {
            checked: checked
        }
    }

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
        label: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = {
        checked: false,
        disabled: false
    }

    static getDerivedStateFromProps(nextProps){
        return { 
            checked: nextProps.checked 
        };
    }

    getComponentClassNames(){
        const { className } = this.props;

        return { 
            component: classNames(
                className ? className : '',
                'select-list__item__checkbox'
            )
        } 
    }

    simulateClick() {
        const { checked } = this.state;

        this.setState({
            checked: !checked
        })
    }

    handlerOnCheck = (event) => {
        const { onClick } = this.props;

        this.simulateClick();

        onClick ? onClick(event) : null;
    }

    updateChecked(props) {
        const { checked } = props;

        this.setState({ checked: checked });
    }

    render() {
        const { label, id } = this.props;

        const { checked } = this.state;

        const classes = this.getComponentClassNames();

        return(
            <label className={ classes.component } onClick={ this.handlerOnCheck } >
				<CheckboxControl
                    id={id}
                    className="select-list__item__checkbox__control"
                    checked={ checked }
                />
				{ label ? <span className="select-list__item__checkbox__label" >{ label }</span> : null }
            </label>
        );
    }
}