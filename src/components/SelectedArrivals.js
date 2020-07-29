import React, { Component, Fragment } from 'react';
import axios from "axios";
const config = require('../config.json');

export default class SelectedArrivals extends Component {

  state = {
    newArrival: { 
      "StationName": "", 
      "id": ""
    },
        arrivals: []
  }

  handleAddStations = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add Stations endpoint here
    try {
      const params = {
        "id": id,
        "StationName": this.state.newArrival.StationName
      };
      await axios.post(`${config.api.invokeUrl}/arrivals/${id}`, params);
      this.setState({ arrivals: [...this.state.arrivals, this.state.newArrival] });
      this.setState({ newArrival: { "StationName": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateStations = async (id, name) => {
    // add call to AWS API Gateway update Stations endpoint here
    try {
      const params = {
        "id": id,
        "StationName": name
      };
      await axios.patch(`${config.api.invokeUrl}/Stations/${id}`, params);
      const stationsToUpdate = [...this.state.stations].find(Stations => Stations.id === id);
      const updatedStations = [...this.state.stations].filter(Stations => Stations.id !== id);
      stationsToUpdate.StationName = name;
      updatedStations.push(stationsToUpdate);
      this.setState({Stations: updatedStations});
    }catch (err) {
      console.log(`Error updating Stations: ${err}`);
    }
  }

  handleDeleteStations = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete Stations endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/Stations/${id}`);
      const updatedStations = [...this.state.Stations].filter(Stations => Stations.id !== id);
      this.setState({Stations: updatedStations});
    }catch (err) {
      console.log(`Unable to delete Stations: ${err}`);
    }
  }


  fetchSelectedArrivals = async () => {
    // add call to AWS API Gateway to fetch Stations here
    // then set them in state
    try {
      await axios.get(`${config.api.invokeUrl}/arrivals`)
      .then((response) => 
      this.setState({arrivals : response.data.Items}));
       const Selarrive = [this.state.arrivals.Items]
      console.log(this.state.arrivals);
       const arrivalString = JSON.stringify(Selarrive);
      //this.setState({arrivals: arrivalString});
       
      //alert(Selarrive);
 
     


    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  
    
    
     
  

  onAddStationNameChange = event => this.setState({ newArrival: { ...this.state.newArrival, "StationName": event.target.value } });
  onAddStationsIdChange = event => this.setState({ newArrival: { ...this.state.newArrival, "id": event.target.value } });

  componentDidMount = async () =>{
  this.fetchSelectedArrivals();
}


  render() {
    return (
      <Fragment>
        <h1>Arrivals Currently Saved </h1>
        {this.state.arrivals.map(arrival => (
         <li key={arrival.train_id}>
         Expected time: {arrival.Expected_Arrival_Time}   From: {arrival.Starting_From}
         </li>))}
      </Fragment>
  )
      }
    }