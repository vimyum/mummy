import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InputIcon from 'material-ui-icons/Input';
import ScheduleIcon from 'material-ui-icons/Schedule';

interface Node {
    type: string;
    disp: string;
    anchor: "source" | "target" | "both";
    iconElement: any;
}

class NodeTemplate {
    static list: Array<Node> = [
        {
            type:   "gpio_in",
            disp:   "GPIO IN",
            anchor: "source",
            iconElement: <InputIcon />,
        },
        {
            type:   "gpio_out",
            disp:   "GPIO OUT",
            anchor: "target",
            iconElement: <InputIcon />,
        },
        {
            type:   "sleep",
            disp:   "SLEEP",
            anchor: "both",
            iconElement: <ScheduleIcon />,
        },
    ];

    static get (name : string): Node {
        return NodeTemplate.list.filter(e => {
            return e.type === name;
        })[0];
    }
}

export default NodeTemplate;
