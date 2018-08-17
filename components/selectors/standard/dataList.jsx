import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import ListItem from './listItem.jsx';

import './list.scss'

export default class DataList extends React.Component {

    static propTypes = {
        selected: PropTypes.object,
        list: PropTypes.array,
        onCheck: PropTypes.func
    }

    static defaultProps = {
        selected: null,
        list: []
    }

    getComponentClassNames(){
        const { className, type, size } = this.props;

        return { 
            component: classNames(
                className ? className : '',
                'select-list'
            ),
            item: classNames(
                size ? `select-list__item--${size}` : ''
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
                                    selected={ selected && selected.id === item.id } 
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