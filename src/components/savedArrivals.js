import React, { Component, Fragment } from 'react';
import Station from './Station';
import axios from "axios";
import ArrivalSearchTable from './ArrivalSearchTable';
const config = require('../config.json');

export default class savedArrivals extends Component {

  state = {
    newStation: null,
    stationlist: []
  }

  mySubmitHandler = (event) => {
    this.setState({stationName: event.target.value});
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
     
            {!this.props.auth.isAuthenticated && ( 
            <h1> No Station list visible. not logged in.</h1>)}
            {this.props.auth.isAuthenticated && ( 
            <ArrivalSearchTable />)}

            
           
            
             <Fragment>
            
                    {this.props.auth.isAuthenticated && (
                      this.state.stationlist && this.state.stationlist.length > 0
                      ? this.state.stationlist.map(station => <Station name={station.StationName} id={station.id} key={station.id} />)
                      :  <div className="tile notification is-warning">No stations available </div> )}
            </Fragment>
      </Fragment>
    )
  }

}
