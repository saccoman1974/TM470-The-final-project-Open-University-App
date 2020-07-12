import React from 'react';


export default function ArrivalWindow() {
  return (
    
    
<div id="arrivals">
       <ul>
      <p>Arrivals at station : {this.state.stationname}</p>
     {this.state.arrivals.map(arrival => (
       <li key={arrival.expected_arrival_time}>
         {arrival.expected_arrival_time} : {arrival.origin_name}
       </li>
     ))}
     </ul>
      </div>

        
        
   
  )
}