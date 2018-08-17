import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';


import './drawer.scss';

// Drawer Component
export default class Drawer extends Component {

    state = {
        active: false,
        drawerElement: null
    }

    static propTypes = {
        className: PropTypes.string,
        size: PropTypes.string,
        children: PropTypes.any,
        title: PropTypes.string,
        history: PropTypes.object,
        showCloseButton: PropTypes.bool
    }

    static defaultProps = {
        title: 'Слайдер',
        size: 'small',
        showCloseButton: true
    }

    getComponentClassNames() {
        const { className, size } = this.props;
        const { active } = this.state;

        return classNames(
            { [className]: Boolean(className) },
            'b-drawer',
            { 'b-drawer--active': active },
            `b-drawer--${size}`
        )
    }

    componentDidMount() {
        // console.log('DRAW mount==========')
        document.body.addEventListener('click', this.handlerOutsideClick);
        setTimeout(() => this.setState({ active: true }), 0)
    }

    componentWillUnmount() {
        // console.log('DRAW unmount ======')
        document.body.removeEventListener('click', this.handlerOutsideClick);
        const {drawerElement} = this.state;

        drawerElement && this.state.drawerElement.removeEventListener('transitionend', this.handlerClose);
    }

    handlerOutsideClick = (event) => {
        const { size } = this.props;
        
        if (size != "full") {
            const drawerElement = document.querySelector('.b-drawer');
            const {drawerElement: drawer} = this.state;
            
            if(!drawer) this.setState({drawerElement});
            if (!drawerElement.contains(event.target)) {
                event.stopPropagation();
                drawerElement.addEventListener('transitionend', this.handlerClose);
                this.setState({ active: false });
            }
        }
    }

    handlerClose = () => {
        const { history: { goBack } } = this.props;
        if (this.state.active === false){
            goBack();
        }
        else {
            const drawerElement = document.querySelector('.b-drawer');
            drawerElement.addEventListener('transitionend', goBack);
            this.setState({ active: false });
        }
    }

    render() {
        // console.log('Drawer render======', this.state);
        const { children, title, showCloseButton } = this.props;

        return (
            <aside
                className={this.getComponentClassNames()}
            >
                <div className="b-drawer__head">
                    <span className="b-drawer__head-label">{title}</span>
                    { showCloseButton && <span className="b-drawer__head-button i-button-close" onClick={this.handlerClose} ></span> }
                </div>
                <div className="b-drawer__body">
                    {children}
                </div>
            </aside>
        );
    }
}
