import React, {Component} from 'react';
import MapContainer from "../map-container";
import './app.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <div>App</div>
                <MapContainer/>
            </div>
        );
    }
};

