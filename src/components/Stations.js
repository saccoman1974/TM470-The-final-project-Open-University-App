import React, { Component, Fragment } from 'react';
import Arrivals from './Stations';
import axios from "axios";
const config = require('../config.json');

export default class Stations extends Component {

  state = {
    newArrivals: null,
    Stations: []
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
                      this.state.Stations && this.state.Stations.length > 0
                      ? this.state.Stations.map(Arrivals => <Arrivals name={Arrivals.Arrivalsname} id={Arrivals.id} key={Arrivals.id} />)
                      : <div className="tile notification is-warning">No stations available</div>
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
