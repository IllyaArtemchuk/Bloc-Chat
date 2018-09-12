import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key
      this.setState({ rooms: this.state.messages.concat(message) })
    });
  }

  logMessage() {
    console.log(this.state.messages)
  }


  render() {
    return (
      <div>
       <h2 onClick={() => this.logMessage()}> {this.props.activeRoom} </h2>
       {this.state.messages.map((message) =>
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
