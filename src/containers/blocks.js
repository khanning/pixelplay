import React from 'react';
import PropTypes from 'prop-types';

import VMScratchBlocks from '../lib/blocks.js';
import VM from 'scratch-vm';
import BlocksComponent from '../components/blocks/blocks.js';

import defaultToolbox from '../lib/default-toolbox.js';

class Blocks extends React.Component {
    constructor (props) {
        super(props);
        // this.ScratchBlocks = VMScratchBlocks(props.vm);
        VMScratchBlocks.setVM(props.vm);
        this.setBlocks = this.setBlocks.bind(this);
        this.attachVM = this.attachVM.bind(this);
        this.detachVM = this.detachVM.bind(this);
        this.onScriptGlowOn = this.onScriptGlowOn.bind(this);
        this.onScriptGlowOff = this.onScriptGlowOff.bind(this);
        this.onBlockGlowOn = this.onBlockGlowOn.bind(this);
        this.onBlockGlowOff = this.onBlockGlowOff.bind(this);
        this.onVisualReport = this.onVisualReport.bind(this);
        this.getBlocks = this.getBlocks.bind(this);
    }

    componentDidMount () {
        this.props.vm.loadProject(Blocks.defaultProject).then(() => {
            this.workspace = VMScratchBlocks.injectBlocks(
                this.blocks, Blocks.defaultOptions, defaultToolbox
            );
            // this.workspace = this.ScratchBlocks.inject(this.blocks, {
                // ...Blocks.defaultOptions,
                // ...{toolbox: defaultToolbox}
            // });
            VMScratchBlocks.loadWorkspace(Blocks.defaultWorkspace);
            // const xml = this.ScratchBlocks.Xml.textToDom(Blocks.defaultWorkspace);
            // this.ScratchBlocks.Xml.domToWorkspace(xml, this.workspace);
            // this.workspace.getFlyout().autoClose = true;
            // this.workspace.getFlyout().width_ = 0;
            this.attachVM();
        });
        this.props.vm.start();
    }

    componentWillUnmount () {

    }

    attachVM () {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace.getFlyout().getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
    }

    detachVM () {

    }

    onScriptGlowOn (data) {
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff (data) {
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn (data) {
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff (data) {
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport (data) {
        this.workspace.reportValue(data.id, data.value);
    }
    setBlocks (blocks) {
        this.blocks = blocks;
    }
    getBlocks () {
        console.log(this.ScratchBlocks.Xml.workspaceToDom(this.workspace));
    }

    render () {
        return (
            <React.Fragment>
                <BlocksComponent
                    containerRef={this.setBlocks}
                    {...this.props}
                />
            </React.Fragment>
        );
    }
}

Blocks.defaultWorkspace =
`<xml>
  <block type="event_whenstarted" deletable="false" x="25" y="50">
    <next>
      <block type="control_forever">
        <statement name="SUBSTACK">
          <block type="looks_changecolor">
            <value name="VALUE">
              <shadow type="math_integer">
                <field name="NUM">10</field>
              </shadow>
            </value>
            <next>
              <block type="control_waitms">
                <value name="VALUE">
                  <shadow type="math_positive_number">
                    <field name="NUM">50</field>
                  </shadow>
                </value>
                <next>
                  <block type="looks_forwardpixel">
                    <value name="VALUE">
                      <shadow type="math_positive_number">
                        <field name="NUM">1</field>
                      </shadow>
                    </value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>`;

Blocks.defaultProject = {
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "currentCostume": 0,
      "costumes": [
      {
        "assetId": "cd21514d0531fdffb22204e0ec5ed84a",
        "name": "backdrop1",
        "bitmapResolution": 1,
        "md5ext": 'cd21514d0531fdffb22204e0ec5ed84a.svg',
        "dataFormat": "png",
        "rotationCenterX": 0,
        "rotationCenterY": 0,
        "skinId": null
      }
      ],
      "sounds": [],
      "volume": 100,
    }
  ],
  "meta": {
    "semver": "3.0.0",
    "vm": "0.1.0",
    "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
  }
};

Blocks.defaultOptions = {
    zoom: {
        startScale: 0.75,
        wheel: true
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#f4f4f4',
        flyout: '#8ec6c5',
        toolbox: '#6983aa',
        toolboxText: '#ffffff',
        toolboxHover: '#a3a3a3',
        toolboxSelected: '#5a7090',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#FFFFFF',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: true,
    collapse: false,
    horizontalLayout: true,
    toolboxPosition: 'end',
    scrollbars: true,
    media: './static/blocks-media/',
    sounds: false
};

Blocks.propTypes = {
    vm: PropTypes.instanceOf(VM).isRequired
};

export default Blocks;
