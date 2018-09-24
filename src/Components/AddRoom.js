import React, { Component } from 'react';
import './AddRoom.css';

class AddRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRoomName: ""
  };

      }

createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {return}
    this.props.roomsRef.push({
       name: this.state.newRoomName,
       createdBy: this.props.user.displayName,
       access: "Public"
    });
    this.setState({ newRoomName: "" })
      }

handleChange(e) {
    this.setState({ newRoomName: e.target.value })
      }

isUserGuest() {
  if (this.props.user == null) {
    return <p> Sign In To Create Rooms! </p>
  }
  else {
    return (
    <form onSubmit={(e) => this.createRoom(e)} className="form-inline">
    <div className="form-group" >
    <label for="text">Create New Room:</label>
      <input type="text"  value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e)} className="form-control"/>
      <input type="Submit" readOnly value="Submit" className="btn btn-light"/>
      </div>
    </form> )
  }
}


    render(){
      return (
        <div>
        {this.isUserGuest()}
        </div>
             )

           }

      }

export default AddRoom;
