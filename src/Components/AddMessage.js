import React, { Component } from 'react';
import './AddMessage.css';


class AddMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: ""
    };
  }


  createMessage(e) {
    e.preventDefault();
    if (!this.state.newMessage) {return}
    this.props.messagesRef.push({
     Username:this.props.isUserGuest(),
     content:this.state.newMessage,
     roomId:this.props.activeRoomID,
     sendAt: this.props.firebase.database.ServerValue.TIMESTAMP
   });
    this.setState ({newMessage: "" })
  }


  handleChange(e) {
      this.setState({ newMessage: e.target.value })
        }

  render(){
    return(
      <div>
      {this.props.activeRoom != ""?<form onSubmit={(e) => this.createMessage(e)} className="form-horizontal" >
      <div className="input-group" >
    <input type="text" value={ this.state.newMessage } onChange={(e) => this.handleChange(e)} className="form-control"/>
    <span className="input-group-btn">
    <input type="submit" value="Send" className="btn btn-dark" />
    </span>
    </div>
    </form>: ""}

  </div>)
  }
}


export default AddMessage;
