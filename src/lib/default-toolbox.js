const defaultToolbox =
`<xml id="aot-toolbox" style="display: none">
      <block type="looks_forwardpixel">
        <value name="VALUE">
          <shadow type="math_positive_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="looks_backpixel">
        <value name="VALUE">
          <shadow type="math_positive_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="looks_changecolor">
        <value name="VALUE">
          <shadow type="math_integer">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="looks_setcolor">
        <value name="VALUE">
          <shadow type="math_whole_number">
            <field name="NUM">${Math.floor(Math.random() * Math.floor(100))}</field>
          </shadow>
        </value>
      </block>
      <block type="looks_setallcolors">
        <value name="VALUE">
          <shadow type="math_whole_number">
            <field name="NUM">${Math.floor(Math.random() * Math.floor(100))}</field>
          </shadow>
        </value>
      </block>
      <block id="control_waitms" type="control_waitms">
        <value name="VALUE">
          <shadow type="math_positive_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
      </block>
      <block id="control_repeat" type="control_repeat">
        <value name="TIMES">
          <shadow type="math_whole_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block id="control_forever" type="control_forever"></block>
      <block id="control_stop" type="control_stop"></block>
      <block id="operator_random" type="operator_random">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
  </xml>`;

export default defaultToolbox;
