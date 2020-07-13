import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import StationSearchForm from './StationSearchForm';



export default class ArrivalSearchTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { stationname: '', 
                   selectedArrival: [],
                   arrivals: [],
                   Schedlued_time: '',
                   Starting_From: '',
                   Status: '',
                   Expected_Arrival_time: '' };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are searching station " + this.state.stationname);
    this.getArrivals();
    
  }


  myChangeHandler = (event) => {
    event.preventDefault();
    this.setState({stationname: event.target.value});
    
  }




  getArrivals(){
    fetch(`https://transportapi.com/v3/uk/train/station/${this.state.stationname}/live.json?app_id=bddbd249&app_key=3c57b5917bd93bed4721da09773d2ca6&darwin=false&train_status=passenger&type=arrival`)
    .then(arrivals => arrivals.json())
     .then(data => this.setState({ arrivals : data.arrivals.all }));
     let string = JSON.stringify(this.state.arrivals);
     console.log(string);
     
  }

 saveArrival = (event) => {
   event.preventDefault();
   let selArrive = JSON.stringify(this.state.selectedArrival);
   alert("You have saved arrival : " + this.state.selectedArrival);
   console.log(this.state.selectedArrival)
 }
 
 savedArrival = (event) => {
   event.preventDefault();
   const selectedIndex = event.target.options.selectedIndex;
   this.setState({Schedlued_time: event.target.options[selectedIndex].getAttribute('aimed_arrival_time')});
   this.setState({selectedArrival: [event.target.value]});
   /* this.setState({selectedArrival:[{aimed_arrival_time: event.target.value.aimed_arrival_time, origin_name:event.target.value.origin_name ,
    status: event.target.value.status, expected_arrival_time: event.target.value.expected_arrival_time}]})
   } */
  
  }

  

  render() {
  

    return (
     
      
      <div className="arrivalsTable">

      <form onSubmit={this.mySubmitHandler}>
     
      <p>Enter the station to search, and submit:</p>
      <input
        type='text' 
        onChange={this.myChangeHandler}
      />
      <input
        type='submit'
      />
      </form>
      
        

         <ul>
         <p>Arrivals at station : {this.state.stationname}</p>
         {this.state.arrivals.map(arrival => (
         <li key={arrival.expected_arrival_time}>
         {arrival.expected_arrival_time} : {arrival.origin_name}
         </li>
         ))}
         </ul>
         
         

            
                <form onSubmit={this.saveArrival} onChange={this.savedArrival}> 
                
                <select> value={this.state.arrivals.map(arrival => (
                   <option key={arrival.origin_name} > {arrival.aimed_arrival_time} From: {arrival.origin_name} Status: {arrival.status} Expected arrival time: {arrival.expected_arrival_time}</option>
                 )) }</select>  
                 
                
                  <p>select arrival to save</p>
                  <input type='submit' />
                  
                  </form> 

            
</div>


    
    );
  

}}