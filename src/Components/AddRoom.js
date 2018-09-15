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
       name: this.state.newRoomName
    });
    this.setState({ newRoomName: "" })
      }

handleChange(e) {
    this.setState({ newRoomName: e.target.value })
      }




    render(){
      return (
        <form onSubmit={(e) => this.createRoom(e)}>
          <input type="text"  value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e)}/>
          <input type="Submit" readOnly value="Create Room"/>
        </form>
             )

           }

      }

export default AddRoom;
