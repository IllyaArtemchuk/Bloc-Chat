import React, { Component } from 'react';
import AddRoom from "./AddRoom"

const RoomsPosition=  {
  float: "left",
  backgroundColor: "rgb(81, 98, 127)",
  height: "100vw",
  color: "white"
}

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }


  render() {
    return(
      <div style={RoomsPosition}>
      {this.state.rooms.map((room) =>
      <div key= {room.key} onClick={this.props.changeRoom} > {room.name} </div>
    )}
    <AddRoom roomsRef={this.roomsRef} rooms={this.state.rooms}/>
      </div>
    )
  }
}

export default RoomList;
