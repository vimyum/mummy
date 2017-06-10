import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as io from 'socket.io-client';

interface PropsType {
};

interface StateType {
};

class WsClient extends React.Component<any, any> {
    private socket;
    private counter;

    constructor () {
        super();
        this.state = {
            acc: {
                date: undefined,
                value : {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            }
        };
        this.socket = io();
        this.socket.emit('join_room', {room: 'iphone'});
        this.counter = 0;
    }

    onIntervalHandler = () => {
        let date = (new Date()).getTime();
        
        this.setState({
            acc: {
                date: date,
                value : {
                    x: Math.random().toFixed(6),
                    y: Math.random().toFixed(6),
                    z: Math.random().toFixed(6),
                },
            }
        });
        this.socket.emit('sensor_data', this.state.acc);
        this.counter += 1;
        console.log('fired');
    };

    componentDidMount() {
        // setInterval(this.onIntervalHandler, 500);
        window.addEventListener("devicemotion", (e) => {
            this.counter += 1;
            if (this.counter < 10) {
                return;
            }
            this.counter = 0;

            let acc = e.acceleration;
            let date = (new Date()).getTime();

            this.setState({
                acc: {
                    date: date,
                    value : {
                        x: acc.x,
                        y: acc.y,
                        z: acc.z,
                    },
                }
            });
            this.socket.emit('sensor_data', this.state.acc);
            console.log('fired');
        });
    };

    render (){
        return (<table><tbody>
                <tr>
                    <td>x</td><td>{this.state.acc.value.x}</td>
                </tr>
                <tr>
                    <td>y</td><td>{this.state.acc.value.y}</td>
                </tr>
                <tr>
                    <td>z</td><td>{this.state.acc.value.z}</td>
                </tr>
            </tbody></table>);
    }
}

export default WsClient;
