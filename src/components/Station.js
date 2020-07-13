import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class searchStationForm extends Component {

  state = {
    isEditMode: false,
    updatedStationName: this.props.name
  }

  handleStationsEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateStations(this.props.id, this.state.updatedStationName);
  }

  onAddStationNameChange = event => this.setState({ "updatedStationName": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isSelectedArrivals && 
          <Fragment>
            <a href="/" onClick={this.handleStationsEdit} className="Stations-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteStations(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit Stations name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedStationName}
                onChange={this.onAddStationNameChange}
              />
              <p className="Stations-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="Stations-title">{ this.props.name }</p>
              <p className="Stations-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
