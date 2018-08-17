import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TabsPane extends Component {
    
    render() {
        return (
            <div className="tabs-pane">
                {this.props.children}
            </div>
        )
    }
}
