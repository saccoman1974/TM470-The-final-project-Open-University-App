import React, { Component, Fragment } from 'react';
import ArrivalWindow from './ArrivalWindow';
import ReactDOM, { render } from 'react-dom';



export default class ArrivalSearchTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { stationname: '' };
    this.state = { arrivals: [] };
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
     var string = JSON.stringify(this.state.arrivals);
     console.log(string);
  }

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
     
      <p>Enter the station to search, and submit:</p>
      <input
        type='text' 
        onChange={this.myChangeHandler}
      />
      <input
        type='submit'
      />
      <ArrivalWindow />
{/*       <div id="arrivals">
       <ul>
      <p>Arrivals at station : {this.state.stationname}</p>
     {this.state.arrivals.map(arrival => (
       <li key={arrival.expected_arrival_time}>
         {arrival.expected_arrival_time} : {arrival.origin_name}
       </li>
     ))}
     </ul>
      </div> */}
      </form>

    );
  }

}

     


    
    


  
    
