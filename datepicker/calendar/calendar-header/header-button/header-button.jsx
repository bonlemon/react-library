import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './header-button.scss';


export default class HeaderButton extends React.PureComponent {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = {
        onClick: () => { }
    }

    getClassNames() {
        const { type } = this.props;
        return classNames(
            'header-button',
            `header-button--${type}`
        )
    }

    render() {
        const { value, onClick } = this.props;
        return (
            <div className='header-button__container'>
                <button className={this.getClassNames()} onClick={onClick}>
                    {
                        value
                    }
                </button>
            </div>
        )
    }
}
