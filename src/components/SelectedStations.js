import React, { Component, Fragment } from 'react';
import Station from './Station';
import axios from "axios";
const config = require('../config.json');

export default class SelectedStations extends Component {

  state = {
    newStation: { 
      "StationName": "", 
      "id": ""
    },
    stations: []
  }

  handleAddStations = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add Stations endpoint here
    try {
      const params = {
        "id": id,
        "StationName": this.state.newStation.StationName
      };
      await axios.post(`${config.api.invokeUrl}/Stations/${id}`, params);
      this.setState({ Stations: [...this.state.stations, this.state.newStation] });
      this.setState({ newStation: { "StationName": "", "id": "" }});
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

  fetchStations = async () => {
    // add call to AWS API Gateway to fetch Stations here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/stations`);
      //const Stations = res.data;
      this.setState({ stations: res.data });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }


  onAddStationNameChange = event => this.setState({ newStation: { ...this.state.newStation, "StationName": event.target.value } });
  onAddStationsIdChange = event => this.setState({ newStation: { ...this.state.newStation, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchStations();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Selected Stations</h1>
            <p className="subtitle is-5">Add and remove Stations using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddStations(this.state.newStation.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newStation.StationName}
                        onChange={this.onAddStationNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newStation.id}
                        onChange={this.onAddStationsIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add Station
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.Stations.map((Station, index) => 
                        <Station
                          isSelectedStations={true}
                          handleUpdateStation={this.handleUpdateStation}
                          handleDeleteStation={this.handleDeleteStation} 
                          name={Station.StationName} 
                          id={Station.id}
                          key={Station.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
