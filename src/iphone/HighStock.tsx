import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HighCharts from 'highcharts/highstock';
import * as io from 'socket.io-client';

class HighStock extends React.Component<any, any> {
    private socket;
    private chart;
    private series = [];

    constructor () {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        let hs = HighCharts;
        this.chart = HighCharts['stockChart']('chartContainer', {series: this.series});

        this.socket = io();
        this.socket.emit('join_room', {room: 'iphone_out'});
        this.socket.on('sensor_data', (data) => {
            console.log('received sensor_data.');
            // console.log(JSON.stringify(data));

            // this.chart.get('x').addPoint([(new Date()).getTime(), Math.round(Math.random() * 100)], true, true);
            // {"date":1496996584986,"value":{"x":"0.154330","y":"0.379386","z":"0.919199"}}
            
            let date = data.date;
            Object.keys(data.value).forEach((series) => {
                let targetSeries = this.chart.get(series);
                if (!targetSeries) {
                    this.chart.addSeries({
                        name: series,
                        id: series,
                        data: [],
                    });
                    console.log(`newTarget(${series}) is added.`);
                    targetSeries = this.chart.get(series);
                }
                let shift = false;
                if (targetSeries.data.length > 100) {
                    shift = true;
                }
                targetSeries.addPoint([date, Math.round(data.value[series] * 1000)], true, shift);
            });
        });
        console.log('component is mounted.');
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    render() {
        return (<div id="chartContainer"></div>);
    }
}

export default HighStock;
