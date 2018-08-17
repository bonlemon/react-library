// React
import React from 'react';
import PropTypes from 'prop-types';

// Lybraries
import classNames from 'classnames';

// Components
import ListItem from './listItem.jsx';

// Styles
import './list.scss'

export default class DataList extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        selected: PropTypes.object,
        onCheck: PropTypes.func,
        list: PropTypes.array,       
    }

    getComponentClassNames(){
        const { className } = this.props;
        return (
            classNames(
                className ? className : '',
                'select-input-list'
            )
        ) 
    }

    render(){
        const { selected, list, onCheck} = this.props;

        const classes = this.getComponentClassNames();

        return(
            <div>
                <ul className={ classes }>  
                    {
                        list.length !== 0 && list.map((item, i) => {
                            return (
                                    <li key={ i } >
                                        <ListItem 
                                            id={ item.id } 
                                            label={ item.label } 
                                            selected={ selected && item.id === selected.id} 
                                            onClick={ onCheck } 
                                        />
                                    </li>
                                )
                            }) 
                    }
                </ul>
            </div>
        );
    }
}