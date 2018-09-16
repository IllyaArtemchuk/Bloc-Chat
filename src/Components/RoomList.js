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

  isUserGuest() {
    if (this.props.user == null) {
      return "Guest"
    }
    else {
      return this.props.user.displayName
    }
  }

  roomDelete(roomKey) {
    let roomList = this.state.rooms.slice();
    const newState = roomList.filter(room => room.key != roomKey)
    this.roomsRef.child(roomKey).remove()
    this.setState ({ rooms: newState })
  }


  render() {
    return(
      <div style={RoomsPosition}>
      <table>
      <colgroup>
      <col id="Delete" />
      <col id="Room Name" />
      </colgroup>
      <tbody>
      {this.state.rooms.map((room) =>
        <tr key= {room.key}>
      <td > {this.isUserGuest() == room.createdBy?(<button onClick={() => this.roomDelete(room.key)}> Delete </button>):" "} </td>
      <td  onClick={() => this.props.changeRoom(room)} > {room.name} </td>
    </tr>)}
    </tbody>
    </table>
    <AddRoom roomsRef={this.roomsRef} rooms={this.state.rooms} user={this.props.user}/>
      </div>
    )
  }
}

export default RoomList;
