import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Input from 'material-ui/Input/Input';
import TextField from 'material-ui/TextField';
import {LabelSwitch} from 'material-ui/Switch';
import NodeTemplates from '../../nodeTemplates';

export class GpioIn extends React.Component<any, any> {
    constructor () {
        super();
    }

    // update config partially
    private updateConfig = (e) => {
        console.log('on change is called.');
        console.log(e.target.value);
        let newConf = this.props.node.conf.filter((item) => item.name == e.target.name)[0];
        newConf.name = e.target.name;
        if (newConf.type == 'boolean') {
            newConf.value = e.target.value == 'true' ? '' : 'true';
        } else {
            newConf.value = e.target.value;
        }
        //console.log(JSON.stringify(newConf, null, '  '));
        this.props.updateNodeConfig(newConf);
    }

    render() {
        let fnc = this.props.onChange;
        let contents = [];
        console.log('configGeneric.render is called.');

        this.props.node.conf.forEach((item, idx) => {
            switch (item.type) {
                case "number": 
                case "text":
                    contents.push(
                        <TextField name={item.name} key={item.name}
                        label={item.label}
                        type={item.type}
                        value={item.value}
                        onChange={this.updateConfig}/>);
                    break;
                case "boolean":
                    contents.push(
                        <LabelSwitch id={item.name} key={item.name}
                        name={item.name}
                        label={item.label}
                        checked={item.value}
                        value={item.value}
                        onChange={this.updateConfig}
                        />
                    );
                    break;
            }
            contents.push(<br key={"br" + idx}/>);
        });

        return <div>{contents}</div>;
    }
}

export default GpioIn;
