import React, { Component } from 'react';

export default class SearchStationForm extends Component {



    render() {
        return (
            <div className="arrivalsTable">
                <ul>
                    <p>Arrivals at station : {this.state.stationname}</p>
                    {this.state.arrivals.map(arrival => (
                        <li key={arrival.expected_arrival_time}>
                            {arrival.expected_arrival_time} : {arrival.origin_name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
