//** IMPORTS **//

// React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Constants
import { sizes } from './constants.js';

// SVG loader
const files = require.context('!svg-sprite-loader!@library/foundation/assets/icons', false, /.*\.svg$/);
files.keys().forEach(files);



//** COMPONENT **//

class Icon extends PureComponent {
    handlerOnClick = () => {
        const { onClick } = this.props;
        return onClick && onClick();
    }
    render(){
        const { 
            className, 
            id, 
            type, 
            fill, 
            size
        } = this.props;

        return(
            <svg 
                className={className}
                id={id}
                width={sizes[size]}
                height={sizes[size]}
                onClick={this.handlerOnClick}
            >
                <use
                    xlinkHref={`#${type}`}
                    fill={fill}
                />
            </svg>
        );
    }
}



//** PROPTYPES **//

Icon.propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    type: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large',
        'xlarge'
    ]).isRequired,
    onClick: PropTypes.func
}



//** DEFAULT PROPS **//

Icon.defaultProps = {
    fill: 'white',
    size: 'small'
}



//** EXPORTS **//

export default Icon;
