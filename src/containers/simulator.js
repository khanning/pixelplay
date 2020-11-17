import React from 'react';

import {connect} from 'react-redux';

import {
    moveNextPixel,
    movePreviousPixel,
    changePixelColor,
    setPixelColor,
    moveForwardPixels,
    moveBackPixels,
    setAllPixelColor
} from '../reducers/pixels.js';

import SimulatorComponent from '../components/simulator/simulator.js'

class Simulator extends React.Component {
    constructor(props) {
        super(props);
        this.vm = this.props.vm;
        this.dispatchPixelCommand = this.dispatchPixelCommand.bind(this);
    }

    componentDidMount() {
        this.vm.on('PIXEL_EVENT', this.dispatchPixelCommand);
    }

    componentWillUnmount() {
        this.vm.removeListener('PIXEL_EVENT', this.dispatchPixelCommand);
    }

    dispatchPixelCommand (data) {
        switch (data.type) {
        case 'nextPixel':
            this.props.nextPixel();
            break;
        case 'previousPixel':
            this.props.previousPixel();
            break;
        case 'changeColor':
            this.props.changePixel(data.value);
            break;
        case 'setColor':
            this.props.setPixel(data.value);
            break;
        case 'forwardPixel':
            this.props.forwardPixel(data.value);
            break;
        case 'backPixel':
            this.props.backPixel(data.value);
            break;
        case 'setAllPixels':
            this.props.setAllPixels(data.value);
            break;
        }
    }

    render() {
        return (
            <SimulatorComponent
                pixelType={this.props.pixelType}
                selectedPixel={this.props.selectedPixel}
                pixelCount={this.props.pixelCount}
                pixelColors={this.props.pixelColors}
                fullscreenVisible={this.props.fullscreenVisible}
            />
        );
    }
}

const mapStateToProps = state => ({
    pixelType: state.pixels.pixelType,
    selectedPixel: state.pixels.selectedPixel,
    pixelCount: state.pixels.pixelCount,
    pixelColors: state.pixels.pixelColors,
    fullscreenVisible: state.modals.fullscreenSimulator
});

const mapDispatchToProps = dispatch => ({
    nextPixel: () => dispatch(moveNextPixel()),
    previousPixel: () => dispatch(movePreviousPixel()),
    changePixel: value => dispatch(changePixelColor(value)),
    setPixel: value => dispatch(setPixelColor(value)),
    forwardPixel: value => dispatch(moveForwardPixels(value)),
    backPixel: value => dispatch(moveBackPixels(value)),
    setAllPixels: value => dispatch(setAllPixelColor(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Simulator);
