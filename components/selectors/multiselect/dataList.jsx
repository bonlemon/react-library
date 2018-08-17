import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import ListItem from './listItem.jsx';

import './list.scss'

export default class DataList extends React.Component {

    static propTypes = {
        selected: PropTypes.array,
        list: PropTypes.array,
        onCheck: PropTypes.func
    }

    static defaultProps = {
        selected: [],
        list: []
    }

    getComponentClassNames(){
        const { className, type, size } = this.props;

        return { 
            component: classNames(
                className ? className : '',
                'multi-select-list'
            ),
            item: classNames(
                size ? `multi-select-list__item--${size}` : ''
            )
        } 
    }

    render(){
        const classes = this.getComponentClassNames();

        const { selected, list, onCheck } = this.props;
        
        return(
            <div className={ classes.component }>
                <ul>
                    { 
                        list.map((item, i) => {
                            return <li key={ i } className={classes.item}>
                                <ListItem  
                                    id={ item.id } label={ item.label } 
                                    selected={ selected.indexOf(item.id) !== -1 } 
                                    onClick={ onCheck } 
                                />
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}