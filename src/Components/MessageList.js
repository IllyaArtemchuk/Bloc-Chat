import React, { Component } from 'react';
import AddMessage from "./AddMessage";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messageBeingEdited: [],
      editText: ""
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

  changeMessageContent(e, messageKey) {
    e.preventDefault();
    if (this.state.editText == "") {return}
    let messagesList = this.state.messages.slice();
    for (let i = 0;i < messagesList.length ;i++) {
      if(messagesList[i].key == messageKey) {
        console.log(messagesList[i].content)
        messagesList[i].content = this.state.editText;
        console.log(messagesList[i].content)
      }
    }
    this.messagesRef.child(messageKey).update({ content: this.state.editText})
    this.setState ({ messages: messagesList,
    messageBeingEdited: [] })
  }



  messageEdit(messageKey, messageContent) {
    let messagesList = this.state.messages.slice();
    const EditedMessage = messagesList.filter(message => message.key == messageKey)
    this.setState ({ messageBeingEdited: EditedMessage,
                     editText: messageContent})
  }



  renderEditInput(messageKey, messageContent) {
     return(
       <form onSubmit={(e) => this.changeMessageContent(e, messageKey)}>
       <input type="text" value={this.state.editText} onChange={(e) => this.handleChange(e, messageKey)}/>
       <input type="submit" value="Confirm" />
       <button onClick={this.cancelRender.bind(this)} >Cancel </button>
       </form>
     )
  }



  handleChange(e, messageKey) {
    e.preventDefault();
    this.setState({ editText: e.target.value })
  }

  cancelRender(event) {
    event.preventDefault();
    this.setState({ messageBeingEdited: [] })
  }

  isMessageBeingEdited() {
    if (this.state.messageBeingEdited[0] == undefined){
      return ("nothing")
    }
    else { return this.state.messageBeingEdited[0].key}
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
  <td> {this.isUserGuest() == message.Username && this.isUserGuest() !== "Guest" ?(<button onClick={() => this.messageEdit(message.key, message.content)}> Edit </button>):" "}</td>
  <td> {message.Username} </td>
  <td> {message.key == this.isMessageBeingEdited()?(this.renderEditInput(message.key, message.content)):message.content} </td>
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
       <col id="Edit Button" />
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
