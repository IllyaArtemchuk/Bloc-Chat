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
    this.props.roomsRef.push({
       name: this.state.newRoomName
    });
      }

handleChange(e) {
    this.setState({ newRoomName: e.target.value })
      }




    render(){
      return (
        <form onSubmit={(e) => this.createRoom(e)}>
          <input type="text"  value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e)}/>
          <input type="Submit" />
        </form>
             )

           }

      }

export default AddRoom;