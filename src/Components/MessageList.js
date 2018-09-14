import React, { Component } from 'react';
import AddMessage from "./AddMessage";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: ["empty"],
      renderedMessages: ["empty"]
    }

    this.messagesRef = this.props.firebase.database().ref('messages');

  }


  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key
      this.setState({ messages: this.state.messages.concat(message) })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeRoom.name !== this.props.activeRoom.name) {
      this.getActiveMessages();
    }
  }

  getActiveMessages() {
    var validMessages = []
    for(let i=0;i < this.state.messages.length; i++) {
      if (this.state.messages[i].roomId == this.props.activeRoomID) {
        validMessages.push(this.state.messages[i])
      }
    }
    for(let i=0;i < validMessages.length; i++){
      let ms = validMessages[i].sendAt;
      let dateMessage = new Date(ms)
      function formatTime() {
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
     var fullDate = formatTime()
      validMessages[i].sendAt = fullDate
    }
    this.setState({ renderedMessages: validMessages });
  }





  render() {
    return (
      <div>
       <h2> {this.props.activeRoom != ""?this.props.activeRoom.name: "Select a Room"} </h2>
       <table>
       <colgroup>
       <col id="Username" />
       <col id="ChatMessage" />
       <col id="MessageSentAt" />
       </colgroup>
       <tbody>
       {this.state.renderedMessages.map((message) =>
       <tr key={ message.key }>
       <td> {message.Username} </td>
       <td> {message.content} </td>
       <td> {message.sendAt} </td>
       </tr>
       )}
       </tbody>
       </table>
       <AddMessage messagesRef={this.messagesRef} user={this.props.user} firebase={this.props.firebase} activeRoomID={this.props.activeRoomID} activeRoom={this.props.activeRoom}/>
      </div>

    )
  }
}

export default MessageList;
