import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import StationSearchForm from './StationSearchForm';
import axios from 'axios';
const config = require('../config.json');


export default class ArrivalSearchTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { trainId: '',
                   stationname: '', 
                   selectedArrival: [],
                   arrivals: [],
                   Scheduled_Time: '',
                   Starting_From: '',
                   Status: '',
                   Expected_Arrival_Time: '', 
                   anArrival: []
  }
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
   alert("You have saved arrival : " + this.state.selectedArrival.Scheduled_Time);
   let arriveOb = this.state.trainId
   let arriveObj = this.state.arrivals.find(arriveOb => this.state.arrivals.train_uid === this.state.anArrival)
   
   console.log(arriveObj)

   console.log(this.state.selectedArrival)
 }
 
 savedArrival = (event, key) => {
   event.preventDefault();
   //const selectedIndex = event.target.options.selectedIndex;
   //this.setState({[key]: this.[key].value});
   this.setState({selectedArrival: event.target.value});
   /* this.setState({selectedArrival:[{aimed_arrival_time: event.target.value.aimed_arrival_time, origin_name:event.target.value.origin_name ,
    status: event.target.value.status, Expected_Arrival_Time: event.target.value.Expected_Arrival_Time}]})
   } */
  
  }

  sendSelectedArrival = async () =>{

    try{
      let params = {
        TableName: "Selected_Arrivals",
        Item: {
            "Train_id": "5464",
           "Scheduled_Time": "18:00" ,
           "Starting_From": "Manchester",
                       "Status": "EARLY",
                       "Expected_Arrival_Time": "17:00"
        }
    }
    //let paramsToSend = JSON.stringify(params);
  
      await axios.post(`${config.api.invokeUrl}/arrivals, ${params}`);
      /* const arrivals = res.data;
      this.setState({selectedArrival: arrivals}); */

    }catch(err){
      console.log(`An error has occurred: ${err}`);
    }

  }

  componentDidMount = ()  => {
    this.sendSelectedArrival();
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
         <li key={arrival.train_uid}>
         {arrival.aimed_arrival_time} : {arrival.origin_name} : {arrival.status} Expected time : {arrival.expected_arrival_time}
         </li>
         ))}
         </ul>
         
         
                
                 
                <form onSubmit={this.saveArrival} onChange={this.savedArrival} >
                
               {<select> value={this.state.arrivals.map(arrival => (
                   <option key={this.state.trainId=arrival.train_uid} > {arrival.aimed_arrival_time}: {arrival.origin_name} Status: {arrival.status} Expected time: {arrival.expected_arrival_time}</option>
                 )) }</select>  } 
                 
                
                  <p>select arrival to save</p>
                  <input type='submit' />
                  
                  </form> 

            
</div>


    
    );
  

}}