import React, { Component, Fragment } from 'react';
import Station from './Station';
import axios from "axios";
const config = require('../config.json');

export default class Stations extends Component {

  state = {
    newStation: null,
    stationlist: []
  }

  fetchStations = async () => {
    // add call to AWS API Gateway to fetch Stations here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/stations`);
      const stations = res.data;
      
      this.setState({ stationlist: stations.Items });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchStations();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Station list</h1>
            <p className="subtitle is-5"></p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.stationlist && this.state.stationlist.length > 0
                      ? this.state.stationlist.map(station => <Station name={station.StationName} id={station.id} key={station.id} />)
                      :  <div className="tile notification is-warning">No stations available</div>
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
