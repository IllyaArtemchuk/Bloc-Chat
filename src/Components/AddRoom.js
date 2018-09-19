import React, { Component } from 'react';


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
    <form onSubmit={(e) => this.createRoom(e)}>
      <input type="text"  value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e)}/>
      <input type="Submit" readOnly value="Create Room"/>
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
