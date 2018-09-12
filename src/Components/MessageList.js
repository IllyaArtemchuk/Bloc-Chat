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

  getActiveMessages() {
    var validMessages = []
    for(let i=0;i < this.state.messages.length; i++) {
      if (this.state.messages[i].roomId === this.props.activeRoom) {
        validMessages.push(this.state.messages[i])
      }
    }
    console.log("updated active messages");
    this.setState({ renderedMessages: validMessages });
  }



  render() {
    return (
      <div>
       <h2 onChange={ () => this.getActiveMessages()}> {this.props.activeRoom} </h2>
       {this.state.renderedMessages.map((message) =>
       <div key={message.key}>
      <p> {message.Username} </p>
      <p> {message.content} </p>
      <p> {message.sendAt} </p>
       </div>
       )}
      </div>

    )
  }
}

export default MessageList;
