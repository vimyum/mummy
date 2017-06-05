import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InputIcon from 'material-ui-icons/Input';
import ScheduleIcon from 'material-ui-icons/Schedule';

import Input from 'material-ui/Input/Input';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import Accessibility from 'material-ui-icons/Accessibility';

import {LabelSwitch} from 'material-ui/Switch';
import ConfigGeneric from './containers/nodes/configGeneric';

interface Node {
    type: string;
    disp: string;
    anchor: "source" | "target" | "both";
    config: any;
    iconElement: any;
    configElement: any;
}
                    //checked={this.state.checkedA}
                    //onChange={(event, checked) => this.setState({ checkedA: checked })}
class NodeTemplate {
    static list: Array<Node> = [
        {
            type:   "gpio_in",
            disp:   "GPIO IN",
            anchor: "source",
            config: [
                {
                    name: "pinId",
                    label: "hello#",
                    type: "number",
                    value: "3",
                    desc: "no description",
                },
                {
                    name: "analog",
                    label: "analog",
                    type: "boolean",
                    value: '',
                    desc: "no description",
                },
                {
                    name: "thresh",
                    label: "threshold",
                    type: "number",
                    value: '',
                    desc: "no description",
                },
            ],
            iconElement: <InputIcon />,
            configElement: (node, handler) => <ConfigGeneric node={node} onChange={handler}/>,
        },
        {
            type:   "gpio_out",
            disp:   "GPIO OUT",
            anchor: "target",
            config: {},
            iconElement: <InputIcon />,
            configElement: () => <p>text of gpio out</p>,
        },
        {
            type:   "pl9823",
            disp:   "PL9823",
            anchor: "target",
            config: {},
            iconElement: <LightbulbOutline />,
            configElement: () => <p>text of 9823</p>,
        },
        {
            type:   "led",
            disp:   "LED",
            anchor: "target",
            config: {},
            iconElement: <LightbulbOutline />,
            configElement: () => <p>text of gpio led</p>,
        },
        {
            type:   "hcsr501",
            disp:   "Detect-IR",
            anchor: "source",
            config: {},
            iconElement: <Accessibility />,
            configElement: () => <p>text of gpio in</p>,
        },
        {
            type:   "sleep",
            disp:   "SLEEP",
            anchor: "both",
            config: {},
            iconElement: <ScheduleIcon />,
            configElement: () => <p>text of gpio in</p>,
        },
    ];

    static get (name : string): Node {
        return NodeTemplate.list.filter(e => {
            return e.type === name;
        })[0];
    }
}

export default NodeTemplate;
