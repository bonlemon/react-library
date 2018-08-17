import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './column-layout.scss';

export default class ColumnLayout extends PureComponent {
    static propTypes = {
        columns: PropTypes.number.isRequired, // Количество столбцов от 1 до 12
        gutter: PropTypes.number, // Множитель для gutter'а gutter*16 (min: 0)
        className: PropTypes.string,
        justify: PropTypes.oneOf(['start', 'end', 'center']),
        direction: PropTypes.oneOf(['column', 'row']),
        children: PropTypes.any,
    }

    static defaultProps = {
        columns: 1,
        gutter: 1,
        justify: 'start',
        direction: 'row'
    }

    getClassNames() {
        const { columns, className, justify, direction } = this.props;
        return classNames(
            'b-column',
            `b-column-${columns}`,
            `b-column--${direction}`,
            { [`b-column--justify-${justify}`]: Boolean(justify) },
            { [className]: Boolean(className) },
        )
    }

    calcLayoutWidth() {
        const { columns, gutter } = this.props;
        const width = 64 * columns + (16 * gutter * columns - 16 * gutter);
        return {
            maxWidth: `${width}px`,
            minWidth: `${width}px`,
        }

    }

    render() {

        return (
            <div 
                className={this.getClassNames()}
                style={this.calcLayoutWidth()}
            >
                {this.props.children}
            </div>
        )
    }
}
