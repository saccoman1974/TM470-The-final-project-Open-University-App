import React, { Component, Fragment, createRef, useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const data = require('./stationsData.json');

export default class StationSearchFrom extends React.Component {

state = {
 trainId: '',            
 Scheduled_Time: '',
 Starting_From: '',
 Status: '',
 Expected_Arrival_Time: '',
 anArrival: [],
  arrivals: [],
  query: "",
  data: data,
  filteredData: [],
  stationName: "",
  stationCode: []
}


mySubmitHandler = (event) => {
  event.preventDefault();
  alert("You are searching station " + this.state.stationname);
  this.getArrivals();
}


myChangeHandler = (event) => {
  event.preventDefault();
  this.setState({stationname: event.target.value});
  const code =  event.target.options.selectedIndex;
  console.log(code)
  let crs =JSON.stringify(this.state.data[code].crsCode);
  let cleanCrs = crs.replace(/"/g,'');
  this.setState({stationCode: cleanCrs})
  console.log(cleanCrs)
  
}


getArrivals(){
  fetch(`https://transportapi.com/v3/uk/train/station/${this.state.stationCode}/live.json?app_id=bddbd249&app_key=3c57b5917bd93bed4721da09773d2ca6&darwin=false&train_status=passenger&type=arrival`)
  .then(arrivals => arrivals.json())
   .then(data => this.setState({ arrivals : data.arrivals.all }));

}


render() {
  return (
<Fragment>
<form onSubmit={this.mySubmitHandler}>
     
     <p>Enter the station to search, and submit:</p>
     <input
       type='text' 
       onChange={this.myChangeHandler}
     />

  <select> value={this.state.data.map(station => (
        <option  key={station.stationName} id={station.crsCode} >{station.stationName}         </option>
       
      )) }</select>  
      
     
       <p>select a station to see current arrivals</p>


     <input
       type='submit'
     />
     </form>
  
        
    </fragment>
  )}
   
}