import React from 'react';

import {getColorHex} from '../../lib/colors.js';

import styles from './simulator.css';

class SimulatorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.refreshCanvas = this.refreshCanvas.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.refreshCanvas);
        this.refreshCanvas();
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.refreshCanvas);
    }

    componentDidUpdate() {
        this.refreshCanvas();
    }

    refreshCanvas () {
        this.width = this.canvasRef.current.getBoundingClientRect().width;
        this.height = this.canvasRef.current.getBoundingClientRect().height;
        this.canvasRef.current.width = this.width;
        this.canvasRef.current.height = this.height;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.save();

        //Draw background
        ctx.clearRect(0, 0, this.width, this.height);

        if (this.props.pixelType === 'ring') {
            this.drawPixelRing(ctx);
        } else {
            this.drawPixelStrip(ctx);
        }

        ctx.restore();
    }

    drawPixelRing(ctx) {
        const {
            pixelCount,
            selectedPixel,
            pixelColors
        } = {...this.props};

        const ringSize = !this.props.fullscreenVisible ? (this.height - 60) / 2 :
            this.height < this.width ? (this.height - 120) / 2 : (this.width - 120) / 2;
        // const ringSize = (!this.props.fullscreenVisible || (this.props.fullscreenVisible && this.height < this.width)) ?
            // (this.height - 60) / 2 : (this.width - 60) / 2;
        // const ringSize = this.props.fullscreenVisible ?
            // this.width < this.height ? (this.width - 60) / 2 : (this.height - 60) / 2 :
            // (this.height - 60) / 2;
        // const ringSize = this.props.fullscreenVisible ? (this.width - 60) / 2 : (this.height - 60) / 2;
        const pixelSize = ringSize/5;

        if (!this.props.fullscreenVisible) {
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 40;
            ctx.beginPath();
            ctx.arc(this.width/2, this.height/2, ringSize, 0, 2 * Math.PI);
            ctx.stroke();
        }

        ctx.translate(this.width/2, this.height/2);

        ctx.fillStyle = 'white';
        for (let i=0; i<pixelCount; i++) {
            ctx.rotate((360/pixelCount) * Math.PI / 180);
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = getColorHex(pixelColors[i]);
            ctx.roundedRect(pixelSize/-2, -ringSize-(pixelSize/2), pixelSize, pixelSize, pixelSize/4);
            ctx.fill();

            if (!this.props.fullscreenVisible && i === selectedPixel) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#f39c12';
                ctx.roundedRect(-12, -ringSize-12, 24, 24, 7);
                ctx.stroke();
            }
        }
    }

    drawPixelStrip(ctx) {
        const {
            pixelCount,
            selectedPixel,
            pixelColors
        } = {...this.props};

        const padding = 25;

        if (!this.props.fullscreenVisible) {
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 40;
            ctx.beginPath();
            ctx.moveTo(padding/2, this.height/2);
            ctx.lineTo(this.width-(padding/2), this.height/2);
            ctx.stroke();
        }

        ctx.fillStyle = 'white';
        const spacing = this.props.fullscreenVisible && this.width < this.height?
            (this.height-padding) / pixelCount :
            (this.width-padding) / pixelCount;
        for (let i=0; i<pixelCount; i++) {
            let x;
            let y;
            if (this.props.fullscreenVisible && this.width < this.height) {
                x = (this.width / 2) - 10;
                y = (padding / 2) + (spacing * i) + (spacing / 2) - 10;
            } else {
                x = (padding / 2) + (spacing * i) + (spacing / 2) - 10;
                y = (this.height / 2) - 10;
            }
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = getColorHex(pixelColors[i]);
            ctx.roundedRect(x, y, 20, 20, 5);
            ctx.fill();

            if (!this.props.fullscreenVisible && i === selectedPixel) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#f39c12';
                ctx.roundedRect(padding/2 + (spacing*i) + (spacing/2) - 12, this.height/2-12, 24, 24, 7);
                ctx.stroke();
            }
        }
    }

    render() {
        return (
            <canvas
                className={styles.simulator}
                ref={this.canvasRef}
            />
        );
    }
}

CanvasRenderingContext2D.prototype.roundedRect = function(x, y, w, h, r) {
    const halfRadians = (2 * Math.PI) / 2;
    const quarterRadians = (2 * Math.PI) / 4;
    this.arc(r+x, r+y, r, -quarterRadians, halfRadians, true);
    this.lineTo(x, y+h-r);
    this.arc(r+x, h-r+y, r, halfRadians, quarterRadians, true);
    this.lineTo(x+w-r, y+h);
    this.arc(x+w-r, y+h-r, r, quarterRadians, 0, true);
    this.lineTo(x+w, y+r);
    this.arc(x+w-r, y+r, r, 0, -quarterRadians, true);
    this.lineTo(x+r, y);
}

export default SimulatorComponent;
