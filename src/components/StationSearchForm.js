import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrivalSearchTable from './ArrivalSearchTable';

export default function StationSearchForm() {
    
    return (
        <div className="arrivalsTable">
        <ul>
        <p>Arrivals at station : {ArrivalSearchTable.state.stationname}</p>
        {this.state.arrivals.map(arrival => (
        <li key={arrival.Expected_Arrival_Time}>
        {arrival.Expected_Arrival_Time} : {arrival.origin_name}
        </li>
        ))}
        </ul>
        </div>
    )
  
}
