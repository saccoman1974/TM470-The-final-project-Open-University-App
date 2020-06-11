import React, { Component, Fragment } from 'react';
import Arrivals from './Arrivals';
import axios from "axios";
const config = require('../config.json');

export default class SelectedArrivals extends Component {

  state = {
    newArrivals: { 
      "Arrivalsname": "", 
      "id": ""
    },
    Stations: []
  }

  handleAddArrivals = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add Arrivals endpoint here
    try {
      const params = {
        "id": id,
        "Arrivalsname": this.state.newArrivals.Arrivalsname
      };
      await axios.post(`${config.api.invokeUrl}/Stations/${id}`, params);
      this.setState({ Stations: [...this.state.Stations, this.state.newArrivals] });
      this.setState({ newArrivals: { "Arrivalsname": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateArrivals = async (id, name) => {
    // add call to AWS API Gateway update Arrivals endpoint here
    try {
      const params = {
        "id": id,
        "Arrivalsname": name
      };
      await axios.patch(`${config.api.invokeUrl}/Stations/${id}`, params);
      const ArrivalsToUpdate = [...this.state.Stations].find(Arrivals => Arrivals.id === id);
      const updatedStations = [...this.state.Stations].filter(Arrivals => Arrivals.id !== id);
      ArrivalsToUpdate.Arrivalsname = name;
      updatedStations.push(ArrivalsToUpdate);
      this.setState({Stations: updatedStations});
    }catch (err) {
      console.log(`Error updating Arrivals: ${err}`);
    }
  }

  handleDeleteArrivals = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete Arrivals endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/Stations/${id}`);
      const updatedStations = [...this.state.Stations].filter(Arrivals => Arrivals.id !== id);
      this.setState({Stations: updatedStations});
    }catch (err) {
      console.log(`Unable to delete Arrivals: ${err}`);
    }
  }

  fetchStations = async () => {
    // add call to AWS API Gateway to fetch Stations here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/Stations`);
      const Stations = res.data;
      this.setState({ Stations: Stations });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddArrivalsNameChange = event => this.setState({ newArrivals: { ...this.state.newArrivals, "Arrivalsname": event.target.value } });
  onAddArrivalsIdChange = event => this.setState({ newArrivals: { ...this.state.newArrivals, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchStations();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Selected arrivals</h1>
            <p className="subtitle is-5">Add and remove arrivals using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddArrivals(this.state.newArrivals.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newArrivals.Arrivalsname}
                        onChange={this.onAddArrivalsNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newArrivals.id}
                        onChange={this.onAddArrivalsIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add Arrivals
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.Stations.map((Arrivals, index) => 
                        <Arrivals 
                          isSelectedArrivals={true}
                          handleUpdateArrivals={this.handleUpdateArrivals}
                          handleDeleteArrivals={this.handleDeleteArrivals} 
                          name={Arrivals.Arrivalsname} 
                          id={Arrivals.id}
                          key={Arrivals.id}
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
