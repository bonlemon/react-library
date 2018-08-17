// ----------------------------------------
// COMPONENT LOGO  🔒
// ----------------------------------------



//** IMPORTS **//

// React
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Constants
import { sizes } from './constants.js';



//** COMPONENT **//

class Logo extends PureComponent {

    handlerOnClick = () => {
        const { onClick } = this.props;
        onClick && onClick();
    }

    render(){
        const { className, id, fill, size } = this.props;

        return(
            <svg 
                width={sizes[size]}
                height={sizes[size]}
                viewBox="0 0 53 53"
                onClick={this.handlerOnClick}
            >
                <path d="M37.1001,0 L15.7001,0 C7.0001,0 0.0001,7 0.0001,15.7 L0.0001,37.1 C0.0001,45.8 7.0001,52.8 15.7001,52.8 L37.1001,52.8 C45.8001,52.8 52.8001,45.8 52.8001,37.1 L52.8001,15.7 C52.8001,7 45.7001,0 37.1001,0" id="Fill-1" fill="#FFFFFF"></path>
                <path d="M43.1001,32.9004 L43.1001,33.0994 C43.0001,34.0004 42.4001,35.0004 41.4001,35.0004 C40.7001,35.0004 40.1001,34.7004 39.6001,34.2004 C39.0001,33.5004 38.5001,32.7004 38.0001,31.2994 C39.5001,26.2994 44.0001,10.2004 44.0001,10.2004 L35.3001,10.2004 C35.3001,10.2004 34.5001,14.0004 33.8001,17.4004 C33.8001,17.2994 33.7001,17.2004 33.7001,17.2004 C33.0001,15.7004 31.8001,13.9004 30.5001,12.7004 C28.3001,10.6004 25.6001,9.6004 22.5001,9.6004 C18.1001,9.6004 14.4001,11.2004 11.5001,14.4004 C8.6001,17.6004 7.1001,21.6004 7.1001,26.2004 C7.1001,31.2004 8.6001,35.4004 11.4001,38.5004 C14.4001,41.7994 18.0001,43.2994 22.7001,43.2994 C25.4001,43.2994 28.1001,42.5004 30.5001,40.9004 C32.1001,39.9004 33.5001,38.4004 34.8001,36.5994 C35.4001,38.4004 35.9001,39.7004 36.6001,40.5994 C37.7001,42.0994 39.4001,43.0004 41.1001,43.0004 C43.0001,43.0004 44.6001,42.0004 45.5001,40.5004 C46.3001,39.0994 46.6001,37.5004 46.6001,34.7004 L46.6001,33.0004 L43.1001,33.0004 L43.1001,32.9004 Z M28.5001,36.0994 C27.2001,38.0004 25.5001,39.0004 23.5001,39.0004 C21.2001,39.0004 19.5001,38.0004 18.3001,35.9004 C17.0001,33.7004 16.3001,30.4004 16.3001,26.2004 C16.3001,22.2994 17.0001,19.2004 18.4001,17.0004 C19.7001,14.9004 21.3001,13.9004 23.6001,13.9004 C25.6001,13.9004 27.1001,14.7004 28.4001,16.5004 C29.8001,18.4004 31.0001,21.5004 31.9001,25.5004 C30.9001,30.9004 29.8001,34.2004 28.5001,36.0994 L28.5001,36.0994 Z" id="Fill-4" fill="#E42945"></path>
            </svg>
        );
    }
}



//** PROPTYPES **//

Logo.propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    fill: PropTypes.string.isRequired,
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large',
        'xlarge'
    ]).isRequired
}



//** DEFAULT PROPS **//

Logo.defaultProps = {
    fill: 'white',
    size: 'small'
}



//** EXPORTS **//

export default Logo;