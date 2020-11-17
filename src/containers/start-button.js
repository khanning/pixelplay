import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import VM from 'scratch-vm';

import StartButtonComponent from '../components/start-button/start-button.js';

class StartButton extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick () {
        if (this.props.projectRunning) {
            this.props.vm.runtime.stopAll();
        } else {
            this.props.vm.runtime.startHats('event_whenstarted');
        }
    }

    render () {
        return (
            <StartButtonComponent
                projectRunning={this.props.projectRunning}
                fullscreenVisible={this.props.fullscreenVisible}
                handleClick={this.handleClick}
            />
        );
    }
}

StartButton.propTypes = {
    projectRunning: PropTypes.bool,
    fullscreenVisible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    projectRunning: state.projectState.projectRunState,
    pixelCount: state.pixels.pixelCount
});

export default connect(mapStateToProps)(StartButton);
