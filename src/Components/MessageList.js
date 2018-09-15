import React, { Component } from 'react';
import AddMessage from "./AddMessage";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }

    this.messagesRef = this.props.firebase.database().ref('messages')

  }


  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key
      this.setState({ messages: this.state.messages.concat(message) })
    })
  }


  messageDelete(messageKey) {
    let messagesList = this.state.messages.slice();
    const newState = messagesList.filter(message => message.key != messageKey)
    this.messagesRef.child(messageKey).remove()
    this.setState ({ messages: newState })
  }


  isUserGuest() {
    if (this.props.user == null) {
      return "Guest"
    }
    else {
      return this.props.user.displayName
    }
  }

  formatTime(time) {
      let ms = time;
      let dateMessage = new Date(ms)
        let month = dateMessage.getMonth()+1;
        let day = dateMessage.getDate();
        let hours = 0;
        let minutes = 0;
        let ampm = "";
        if(dateMessage.getHours()+1 > 12) {
          hours = dateMessage.getHours()-11;
          ampm = "PM";
        }
        if(dateMessage.getHours()+1 <= 12) {
          hours = dateMessage.getHours()+1;
          ampm = "AM";
        }
        if(dateMessage.getMinutes() < 10) {
          minutes = "0"+dateMessage.getMinutes();
        }
        if(dateMessage.getMinutes() >= 10) {
          minutes = dateMessage.getMinutes();
        }
        return (month+"/"+day+" "+hours+":"+minutes+" "+ampm)
      }

  renderRoomMessages() {
  if(this.state.messages[0] === undefined) {return}
  let validMessages = [];
  for(let i=0;i < this.state.messages.length;i++){
    if (this.state.messages[i].roomId == this.props.activeRoomID) {
      validMessages.push(this.state.messages[i])}
  }
  return(validMessages.map((message) =>
  <tr key={ message.key }>
  <td> {this.isUserGuest() == message.Username && this.isUserGuest() !== "Guest" ?(<button onClick={() => this.messageDelete(message.key)}> Delete </button>):" "}</td>
  <td> {message.Username} </td>
  <td> {message.content} </td>
  <td> {this.formatTime(message.sendAt)} </td>
  </tr>
))
  }


  render() {
    return (
      <div>
       <h2> {this.props.activeRoom != ""?this.props.activeRoom.name: "Select a Room"} </h2>
       <table>
       <colgroup>
       <col id="Delete Button" />
       <col id="Username" />
       <col id="ChatMessage" />
       <col id="MessageSentAt" />
       </colgroup>
       <tbody>
       {this.renderRoomMessages()}
       </tbody>
       </table>
       <AddMessage messages={this.state.messages}  messagesRef={this.messagesRef} user={this.props.user} firebase={this.props.firebase} activeRoomID={this.props.activeRoomID} activeRoom={this.props.activeRoom} isUserGuest={this.isUserGuest.bind(this)}/>
      </div>

    )
  }
}

export default MessageList;
