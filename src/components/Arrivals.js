import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SelectedArrivals extends Component {

  state = {
    isEditMode: false,
    updatedArrivalsname: this.props.name
  }

  handleArrivalsEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateArrivals(this.props.id, this.state.updatedArrivalsname);
  }

  onAddArrivalsNameChange = event => this.setState({ "updatedArrivalsname": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isSelectedArrivals && 
          <Fragment>
            <a href="/" onClick={this.handleArrivalsEdit} className="Arrivals-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteArrivals(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit Arrivals name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedArrivalsname}
                onChange={this.onAddArrivalsNameChange}
              />
              <p className="Arrivals-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="Arrivals-title">{ this.props.name }</p>
              <p className="Arrivals-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
