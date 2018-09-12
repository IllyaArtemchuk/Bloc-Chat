import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";
import RoomList from "./Components/RoomList"
import MessageList from "./Components/MessageList"

const Header = {
  backgroundColor:"rgb(167, 171, 178)",
  height:"10vw",
  marginBottom:"-.1vw",
  marginTtop:"-2vw"
}
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCYGhIAx9C3m1cZm752PrTS2sVNIGVwzFo",
    authDomain: "chat-8ec63.firebaseapp.com",
    databaseURL: "https://chat-8ec63.firebaseio.com",
    projectId: "chat-8ec63",
    storageBucket: "chat-8ec63.appspot.com",
    messagingSenderId: "277975213132"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: ""
    };
  }

  changeRoom(room) {
    this.setState({ activeRoom: room});
  }


  render() {
    return (
      <div className="App">
      <h1 style={Header}> Bloc Chat </h1>
      <RoomList
         firebase={firebase} changeRoom={this.changeRoom.bind(this)}/>

      <MessageList activeRoomID={this.state.activeRoom.key} activeRoom={this.state.activeRoom.name} firebase={firebase}/>
      </div>
    );
  }
}

export default App;
