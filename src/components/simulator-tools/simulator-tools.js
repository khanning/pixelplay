import React from 'react';
import PropTypes from 'prop-types';

import ImageButtonComponent from '../image-button/image-button.js';
import PixelCountComponent from '../pixel-count/pixel-count.js';

import ringIcon from './icon--ring.svg';
import stripIcon from './icon--strip.svg';

import styles from './simulator-tools.css';

const SimulatorToolsComponent = props => {
    return (
        <>
        <div className={styles.pixelCountContainer}>
            <PixelCountComponent />
        </div>
        <div className={styles.pixelStyleTools}>
            <ImageButtonComponent
                width={40}
                height={40}
                handleClick={props.setStyleRing}
                src={ringIcon}
            />
            <ImageButtonComponent
                width={40}
                height={40}
                handleClick={props.setStyleStrip}
                src={stripIcon}
            />
        </div>
        </>
    );
};

SimulatorToolsComponent.propTypes = {
    setStyleRing: PropTypes.func.isRequired,
    setStyleStrip: PropTypes.func.isRequired
};

export default SimulatorToolsComponent;
