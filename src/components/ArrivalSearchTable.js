import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import StationSearchForm from './StationSearchForm';
import axios from 'axios';
const config = require('../config.json');


export default class ArrivalSearchTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { selectedArrival: {},
                   trainId: '',            
                   Scheduled_Time: '',
                   Starting_From: '',
                   Status: '',
                   Expected_Arrival_Time: '',
                   anArrival: [],
                   arrivals: [],
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
   const pos = event.target.options.selectedIndex;

   let string = JSON.stringify(this.state.arrivals[pos].train_uid);
   let newString = string.replace(/"/g,'');
   let cleanString = newString.replace(/\\/g,'');
   this.setState({trainId: cleanString});

   let astring = JSON.stringify(this.state.arrivals[pos].aimed_arrival_time);
   let anewString = astring.replace(/"/g,'');
   let acleanString = anewString.replace(/\\/g,'');
   this.setState({Scheduled_Time: acleanString});

   let bstring = JSON.stringify(this.state.arrivals[pos].origin_name);
   let bnewString = bstring.replace(/"/g,'');
   let bcleanString = bnewString.replace(/\\/g,'');
   this.setState({Starting_From: bcleanString});

   let cstring = JSON.stringify(this.state.arrivals[pos].status);
   let cnewString = cstring.replace(/"/g,'');
   let ccleanString = cnewString.replace(/\\/g,'');
   this.setState({Status: ccleanString});

   let dstring = JSON.stringify(this.state.arrivals[pos].expected_arrival_time);
   let dnewString = dstring.replace(/"/g,'');
   let dcleanString = dnewString.replace(/\\/g,'');
   this.setState({Expected_Arrival_Time: dcleanString});
   
   this.setState({anArrival: this.cleanString})
   console.log(cleanString);
   console.log(event.target.options.selectedIndex);

   /* this.setState({selectedArrival:[{aimed_arrival_time: event.target.value.aimed_arrival_time, origin_name:event.target.value.origin_name ,
    status: event.target.value.status, Expected_Arrival_Time: event.target.value.Expected_Arrival_Time}]})
   } */
  
  }

  sendSelectedArrival = async () =>{

    try{
      let params = {
         
            "Train_id": "5464",
           "Scheduled_Time": "18:00" ,
           "Starting_From": "Manchester",
                       "Status": "EARLY",
                       "Expected_Arrival_Time": "17:00"
        }
    

    let paramsToSend = JSON.stringify(params);
    console.log(paramsToSend);
  
      await axios.post(`https://vb08tuunv5.execute-api.eu-west-2.amazonaws.com/post2/arrivals/%7BTrain-id%7D ${paramsToSend}`);
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
         <li key={arrival.train_uid} >
         {arrival.aimed_arrival_time} : {arrival.origin_name}  : {arrival.status} Expected time : {arrival.expected_arrival_time}
         </li>
         ))}
         </ul>
         
         
                
                 
                <form onSubmit={this.saveArrival} onChange={this.savedArrival}  >
                
               {<select> value={this.state.arrivals.map(arrival => (
                   <option  key={arrival.train_uid}  id={arrival.train_uid}> {arrival.aimed_arrival_time} : {arrival.origin_name} Status: {arrival.status} Expected time: {arrival.expected_arrival_time}</option>
                  
                 )) }</select>  } 
                 
                
                  <p>select arrival to save</p>
                  <input type='submit'  />
                  
                  </form> 

            
</div>


    
    );
  

}}