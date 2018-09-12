import React, { Component } from 'react';
import AddRoom from "./AddRoom"


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
    console.log(this.state.rooms);
  }


  render() {
    return(
      <div>
      {this.state.rooms.map((room) =>
      <div key= {room.key} > {room.name} </div>
    )}
    <AddRoom roomsRef={this.roomsRef} rooms={this.state.rooms}/>
      </div>
    )
  }
}

export default RoomList;
