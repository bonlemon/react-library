import React, { Component } from 'react';
import PropTypes from 'prop-types';

import joinClasses from 'classnames';

import './tabs.scss';

export default class Tabs extends Component {
    state = {
        selected: 0
    }

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.element,
        ]),
    }

    handleClick = (event) => {
        event.preventDefault();
        const index = event.target.dataset.index;
        this.setState({ selected: index });
    }

    getTabLinkClassName(index) {
        const { selected } = this.state;
        return joinClasses(
            'tabs__titles__link',
            { 'tabs__titles__link--active': Boolean(selected == index) }
        )
    }

    renderTabLinks() {
        const { children } = this.props;
        
        return Array.from(children).map((tab, index) => {
            return (
                tab ?
                    (<li key={index}
                        data-index={index}
                        className={this.getTabLinkClassName(index)}
                        onClick={this.handleClick}>
                        {
                            tab.props.label
                        }
                    </li>)
                    :
                    null

            )
        })
    }

    renderTabsTitles() {
        return (
            <ul className="tabs__titles">
                {this.renderTabLinks()}
            </ul>
        )
    }

    render() {
        const { selected } = this.state;
        return (
            <div className="tabs">
                {this.renderTabsTitles()}
                {this.props.children[selected]}
            </div>

        )
    }
}
