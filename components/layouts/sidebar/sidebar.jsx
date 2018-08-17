//** IMPORTS **//

// React
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// Library's
import classNames from 'classnames'
// Styles
import './sidebar.scss';
// Components
import Responsive from '@library/components/layouts/responsive';
import Divider from '@library/components/layouts/divider';
import ColumnLayout from '@library/components/layouts/column-layout'



//** COMPONENT **//

export default class Sidebar extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.any
    }

    getComponentClassNames() {
        const { className } = this.props;
        return classNames(
            'b-chapter-sidebar',
            { [className]: Boolean(className) },
        )
    }

    render() {
        const { children } = this.props;
        return (
            <Responsive className={this.getComponentClassNames()}>
                <Divider vertical />
                <ColumnLayout
                    columns={3}
                >
                    {children}
                </ColumnLayout>
                <Divider vertical />
            </Responsive>
        )
    }
}
