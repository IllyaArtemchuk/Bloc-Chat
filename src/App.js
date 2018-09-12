import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";
import RoomList from "./Components/RoomList"

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
      activeRoomKey: "1"
    };
  }

  changeRoom() {
    this.setState({ activeRoomKey: this.key});
    console.log(this.state.activeRoomKey);
  }


  render() {
    return (
      <div className="App">
      <h1 style={Header}> Bloc Chat </h1>
      <RoomList
         firebase={firebase} changeRoom={() => this.changeRoom()}/>
      </div>
    );
  }
}

export default App;
