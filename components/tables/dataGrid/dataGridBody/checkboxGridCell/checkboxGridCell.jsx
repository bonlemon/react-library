import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'library/inputs/checkbox';

import './checkboxGridCell.scss';

export default class CheckboxGridCell extends Component {

    state = {
        isChecked: false,
        isDisabled: false
    }

    static propTypes = {
        width: PropTypes.number,
        leftOffset: PropTypes.number,
        onClick: PropTypes.func,
        checked: PropTypes.bool,
        disabled: PropTypes.bool
    }

    componentDidMount() {
        if (this.props.checked !== this.state.isChecked)
            this.setState({ isChecked: this.props.checked });
        if (this.props.disabled !== this.state.isDisabled)
            this.setState({ isDisabled: this.props.disabled });
    }

    componentWillReceiveProps(nextProps) {
        nextProps.checked !== this.state.isChecked ?
            this.setState({ isChecked: nextProps.checked }) : null
        nextProps.disabled !== this.state.isDisabled ?
            this.setState({ isDisabled: nextProps.disabled }) : null
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isChecked !== this.state.isChecked) {
            const { onClick } = this.props;
            onClick(this.state.isChecked);
        }
    }

    getStyles() {
        const { width, leftOffset } = this.props;
        const styles = {
            width: `${width}px`,
            left: leftOffset
        };
        return styles;
    }

    handlerCheck = (e) => {
        const checkboxClassList = e.target.parentElement.classList;
        if (checkboxClassList.contains('b-checkbox') || checkboxClassList.contains('data-grid-cell--check')) {
            this.setState({
                isChecked: !this.state.isChecked
            })
        }
    }

    render() {
        const { isChecked, isDisabled } = this.state;

        return (
            <div className="data-grid-cell data-grid-cell__fixed data-grid-cell--check" style={this.getStyles()}>
                <Checkbox checked={isChecked} onClick={this.handlerCheck} disabled={isDisabled} />
            </div>
        )
    }
}