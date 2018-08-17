import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './tooltip.scss';

export default class DataGridTooltip extends Component {
    static propTypes = {
        value: PropTypes.string,
        position: PropTypes.string
    }

    static defaultProps = {
        position: 'top'
    }

    state = {
        isVisible: false,
        el: null,
        anchor: null,
        positionEl: null
    }

    componentDidMount() {
        const { position } = this.props;

        document.documentElement.addEventListener("scroll", this.handleMouseOut, true);

        this.setState({
            positionEl: position
        })
    }

    componentDidUpdate() {
        const { anchor } = this.state;

        const el = anchor && anchor.previousSibling;
        this.getCoordinations(el, anchor);
    }

    componentWillUnmount() {
        document.documentElement.removeEventListener("scroll", this.handleMouseOut, true);
    }

    getClassNames() {
        const { positionEl } = this.state;
        const { className } = this.props;

        return {
            cover: classNames( className ? className : '',
                'tooltip-cover'
            ),
            body: classNames(
                    'tooltip',
                    positionEl ? `tooltip__${positionEl}` : ''
            )
        } 
    }

    handleOnMouseOver = (e) => {
        let target = e.target;

        while (!target.classList.contains('l-layout')) {
            if (target.classList.contains('tooltip-cover')) {
                this.setState({
                    anchor: target.children[0],
                    isVisible: true
                }) 
                return;
            }
            target = target.parentNode;
        }
    }

    handleMouseOut = () => {
        const { isVisible } = this.state;

        isVisible && this.setState({
            isVisible: false
        })
    }

    checkAvailableSpace(tooltipElem, anchor) {
        const { positionEl } = this.state;
        const anchorCoords = anchor.getBoundingClientRect(); 

        switch (positionEl) {
            case "top":
                if(tooltipElem.offsetHeight >= anchorCoords.top ) {
                    this.setState({positionEl: "bottom"})
                }                  
            break;
                
            case "bottom":
                if(tooltipElem.offsetHeight >= document.documentElement.scrollHeight - anchorCoords.top - anchor.clientHeight) {
                    this.setState({positionEl: "top"})
                }
            break;
        }
    }

    getCoordinations(tooltipElem, anchor) {
        const { positionEl } = this.state;

        if(tooltipElem) {
            const anchorCoords = anchor.getBoundingClientRect(); 
                    
            this.checkAvailableSpace(tooltipElem, anchor);

            switch (positionEl) {
                case "top":
                    tooltipElem.style.left = anchorCoords.left + anchor.offsetWidth/2 - tooltipElem.offsetWidth/2 + "px";
                    tooltipElem.style.top = anchorCoords.top - tooltipElem.offsetHeight - 10 + "px";                  
                break;
        
                case "right":
                    tooltipElem.style.left = anchorCoords.left + anchor.offsetWidth + "px";
                    tooltipElem.style.top = anchorCoords.top + anchor.offsetHeight/2 - tooltipElem.offsetHeight/2 + "px";
                break;
        
                case "bottom":
                    tooltipElem.style.left = anchorCoords.left + anchor.offsetWidth/2 - tooltipElem.offsetWidth/2 + "px";
                    tooltipElem.style.top = anchorCoords.top + anchor.offsetHeight + 10 + "px";
                break;

                case "left":
                    tooltipElem.style.left = anchorCoords.left - tooltipElem.offsetWidth - 15 + "px";
                    tooltipElem.style.top = anchorCoords.top + "px";
                break;
            }
        }
    }

    render() {
        const { children, value } = this.props;
        const { isVisible } = this.state;

        const classes = this.getClassNames();
        
        return (
            <div className={classes.cover} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleMouseOut}>
                {
                    isVisible && <div className={classes.body}>
                        <span className="tooltip-content">
                            { value } 
                        </span>                               
                    </div>
                }
                { children }
            </div>
        )
    }
}
