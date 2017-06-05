import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Tabs, Tab} from 'material-ui';

function TabMenu(props) {
    return <Tabs index={props.tabIndex} onChange={props.handleClick}>
        <Tab label="Assets" />
        <Tab label="Flow" />
        <Tab label="Visualize" />
    </Tabs>;
}
export default TabMenu;
