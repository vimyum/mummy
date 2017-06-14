import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as  ReactGridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import AssetAddDialog from '../containers/assetAddDialog';
import AddAssetButton from '../containers/AddAssetButton';

class Assets extends React.Component<any, any> {
    constructor(props) {
        super();
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }
    
    componentDidUpdate() {
    }

    render() {
        let assets = [];
        let x: Number, y: Number;
        this.props.assets.forEach((asset) => {
            let layout = this.props.layout.filter((e) => {
                console.log(`e.i:${e.i}, asset.id:${asset.id}`);
                return (e.i === asset.id);
            })[0];
            x = layout ? layout.x : 0;
            y = layout ? layout.y : 0;

            if (!layout) {
                debugger;
            }

            assets.push(
                <div key={asset.id} data-grid={{x: x, y: y, w: 2, h: 4}}>
                    <Paper style={{width:"100%", height:"100%"}} 
                        className={this.props.classes.paper}>
                         {asset.name}
                    </Paper>
                </div>
            );
        });

        return <div>
        <ResponsiveReactGridLayout className="layout" 
        onLayoutChange={this.props.onLayoutChange}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
              cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
              rowHeight={30}
              verticalCompact={false} >
              {assets}
        </ResponsiveReactGridLayout>
        <AddAssetButton />
        <AssetAddDialog />
        </div>;
    }
}

const styleSheet = createStyleSheet('Assets', (theme) => ({
    paper: {
        textAlign: 'center',
        height: '100%',
    },
}));

export default withStyles(styleSheet)(Assets);
