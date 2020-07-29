import React, { Component, Fragment } from 'react';
import ReactDOM, { render } from 'react-dom';
import axios from 'axios';
const config = require('../config.json');
const data = require('./stationsData.json');

export default class ArrivalSearchTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { stationName: '',
                   trainId: '',            
                   Scheduled_Time: '',
                   Starting_From: '',
                   Status: '',
                   Expected_Arrival_Time: '',
                   arrivals: [],
                   stationCode:'',
                   data: data
  }
}

mySubmitHandler = (event) => {
  event.preventDefault();
  alert("You are searching station " + this.state.stationName);
  this.getArrivals();
}


myChangeHandler = (event) => {
  event.preventDefault();
  this.setState({stationName: event.target.value});
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

 saveArrival =  event => {
   event.preventDefault();

   alert("You have saved an arrival coming in at " + this.state.Scheduled_Time +" from " + this.state.Starting_From);
 

   console.log(this.state.trainId)
   this.sendSelectedArrival();
 }
 
 savedArrival =  event => {
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

  sendSelectedArrival () {   
      let data = {
         
            "Train_id": this.state.trainId,
           "Scheduled_Time": this.state.Scheduled_Time,
           "Starting_From": this.state.Starting_From,
                       "Status": this.state.Status,
                       "Expected_Arrival_Time": this.state.Expected_Arrival_Time
        }
    

    let paramsToSend = JSON.stringify(data);
    let test = this.state.trainId;
    console.log(test);
    test = JSON.stringify(test);
    console.log(paramsToSend);
    const axios = require('axios');
    //let data = '{"Train_id":"5463","Scheduled_Time":"18:00","Starting_From":"York","Status":"EARLY","Expected_Arrival_Time":"17:00"}';
    
    let config = {
      method: 'post',
      url: 'https://vb08tuunv5.execute-api.eu-west-2.amazonaws.com/post2/arrivals/%7BTrain-id%7D',
      headers: { 
        'X-Amz-Content-Sha256': 'beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3', 
        'X-Amz-Date': '20200724T152736Z', 
        'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIA4QSRPFJEQJUVE4LO/20200724/eu-west-2/execute-api/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=f1bdec163d3ae3bb1d266a1257e04cf8e908257e5588d8ec31bab62fc10d607f', 
        'Content-Type': 'text/plain'
      },
      data : data
    };
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    

   





  }
  componentDidMount = ()  => {
   
  }
  


  

  render() {
  

    return (
     


      
      <div className="arrivalsTable">

        

      <form  onSubmit={this.mySubmitHandler}  onChange={this.myChangeHandler}>
        <label>Select the station to search, and submit: <br/>
        <select>  value={this.state.data.map(station => (  
        <option  key={station.stationName} id={station.crsCode} >{station.stationName}         </option>
       
      )) }</select>  
      </label> 
      <input 
        type='submit' value='Search Station'

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
                
               {<select>  value={this.state.arrivals.map(arrival =>  (
                   <option  key={arrival.train_uid}  id={arrival.train_uid}> {arrival.aimed_arrival_time} : {arrival.origin_name} Status: {arrival.status} Expected time: {arrival.expected_arrival_time}</option>
                  
                 )) }</select>  } 
                 
                
                  <p>select arrival to save</p>
                  <input type='submit' value='Save arrival' />
                  
                  </form> 

            
</div>


    
    );
  

}}