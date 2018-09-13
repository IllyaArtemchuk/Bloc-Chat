import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      renderedMessages: []
    }

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key
      this.setState({ messages: this.state.messages.concat(message) })
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeRoom !== this.props.activeRoom) {
      this.getActiveMessages()
    }
  }

  getActiveMessages() {
    var validMessages = []
    for(let i=0;i < this.state.messages.length; i++) {
      if (this.state.messages[i].roomId == this.props.activeRoomID) {
        validMessages.push(this.state.messages[i])
      }
    }
    this.setState({ renderedMessages: validMessages });
  }





  render() {
    return (
      <div>
       <h2 > {this.props.activeRoom} </h2>
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
      </div>

    )
  }
}

export default MessageList;
