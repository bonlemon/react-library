import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames';

import './action-panel.scss';

export default class ActionPanel extends Component {
    static propTypes = {
        className: PropTypes.string,
        position:PropTypes.string,
        component: PropTypes.func,
    }

    static contextTypes = {
        callback: PropTypes.func,
    }
      
    getComponentClassNames() {
        const { className, position } = this.props;
        return classNames(
            'action-panel',
            { [className]: Boolean(className) },
            `action-panel__${position}`
        )
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <div className={this.getComponentClassNames()}>
                <Component {...rest} onCallback={this.context.callback}/>
            </div >
        )


    }
}
