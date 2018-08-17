import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Checkbox from 'library/inputs/checkbox';

export default class CheckboxHeaderCell extends PureComponent {

    state = {
        isChecked: false
    }

    static propTypes = {
        onChecked: PropTypes.func,
        disabled: PropTypes.bool,
        width: PropTypes.number,
        leftOffset: PropTypes.number,
        styles: PropTypes.object,
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        nextState.isChecked !== this.state.isChecked ?
            this.props.onChecked(nextState.isChecked) : null
    }

    getStyles = () => {
        const { width, leftOffset, styles } = this.props;
        return {
            width: `${width}px`,
            left: leftOffset,
            ...styles
        };
    }

    getComponentClassNames = () => {
        const { disabled } = this.props;
        return classNames('data-grid-header-cell',
            'data-grid-header-cell__fixed',
            'data-grid-header-cell--check',
            {'data-grid-header-cell__disabled': disabled}
        )
    }

    onToggleRowsSelect = () => {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }))
    }


    render() {
        const { isChecked } = this.state;
        const { disabled } = this.props;
        return (
            <div className={this.getComponentClassNames()} style={this.getStyles()}>
                <Checkbox
                    checked={isChecked}
                    onClick={this.onToggleRowsSelect}
                    disabled={disabled} />
            </div>
        )
    }
}