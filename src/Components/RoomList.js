import React, { Component } from 'react';
import AddRoom from "./AddRoom"
import AddPrivateRoom from "./AddPrivateRoom"
import './RoomList.css';

const RoomsPosition=  {
  float: "left",
  backgroundColor: "rgb(81, 98, 127)",
  height: "745px",
  color: "white",
  marginRight: "90px",
  textAlign: "left",
  border: "solid",
  borderColor: "rgb(73, 73, 73)"
}

const tableBody= {
  textAlign: "left",
}

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      roomBeingEdited: [],
      editText: "",
      roomSettings: false
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

  roomEdit(roomKey, roomName) {
    let roomsList = this.state.rooms.slice();
    const EditedRooms = roomsList.filter(room => room.key == roomKey)
    this.setState ({ roomBeingEdited: EditedRooms,
                     editText: roomName})
  }

  renderEditInput(roomKey, roomName) {
     return(
       <form onSubmit={(e) => this.changeRoomName(e, roomKey)}>
       <input type="text" value={this.state.editText} onChange={(e) => this.handleChange(e, roomKey)}/>
       <input type="submit" value="Confirm" />
       <button onClick={this.cancelRender.bind(this)} >Cancel </button>
       </form>
     )
  }

  isRoomBeingEdited() {
    if (this.state.roomBeingEdited[0] == undefined){
      return ("nothing")
    }
    else { return this.state.roomBeingEdited[0].key}
  }

  handleChange(e, roomKey)  {
    e.preventDefault();
    this.setState({ editText: e.target.value })
  }

  cancelRender(event) {
    event.preventDefault();
    this.setState({ roomBeingEdited: [] })
  }

  changeRoomName(e, roomKey) {
    e.preventDefault();
    if (this.state.editText == "") {return}
    let roomsList = this.state.rooms.slice();
    for (let i = 0;i < roomsList.length ;i++) {
      if(roomsList[i].key == roomKey) {
        roomsList[i].name = this.state.editText;
      }
    }
    this.roomsRef.child(roomKey).update({ name: this.state.editText})
    this.setState ({ rooms: roomsList,
    roomBeingEdited: [] })
  }

  handleRoomSettings(e) {
    if(this.state.roomSettings == true) {
      this.setState({ roomSettings: false })
    }
    else if(this.state.roomSettings == false) {
      this.setState({ roomSettings: true })
    }
  }



  render() {
    return(
      <div style={RoomsPosition}>
      <button id="roomSettingsButton" className="btn btn-light" onClick={(e)=> this.handleRoomSettings(e)}>{this.state.roomSettings == true?<div>Return</div>:<div>Room Settings</div>}</button>
       <div className="table-wrapper-scroll-y">
      <table className="table">
      <colgroup>
      <col id="Room Delete" />
      <col id="Room Edit" />
      <col id="Room Name" />
      </colgroup>
      <tbody style={tableBody}>
      {this.state.rooms.map((room) =>
        <tr key= {room.key}>
      <td className="dynamicButton" > {this.state.roomSettings == true && (this.props.isAdmin == true || this.isUserGuest() == room.createdBy)?(<button className="dynamicButton1" onClick={() => this.roomDelete(room.key)}> Delete </button>):""} </td>
      <td className="dynamicButtonSmall"> {this.state.roomSettings == true && (this.props.isAdmin == true || this.isUserGuest() == room.createdBy)?(<button className="dynamicButtonSmall1" onClick={() => this.roomEdit(room.key, room.name)}> Edit </button>):""}</td>
      {this.props.isAdmin === true || room.access === "Public" || room.authorizedUsers.includes(this.isUserGuest()) === true?(<td className="roomName" onClick={() => this.props.changeRoom(room)} > {room.key == this.isRoomBeingEdited()?(this.renderEditInput(room.key, room.name)):room.name}</td>):""}
    </tr>)}
    </tbody>
    </table>
    </div>
    <AddRoom roomsRef={this.roomsRef} rooms={this.state.rooms} user={this.props.user}/>
    <div className="divider">
    </div>
    <AddPrivateRoom roomsRef={this.roomsRef} rooms={this.state.rooms} user={this.props.user} isAdmin={this.props.isAdmin}/>
      </div>
    )
  }
}

export default RoomList;
