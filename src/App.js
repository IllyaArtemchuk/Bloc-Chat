import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";
import RoomList from "./Components/RoomList"


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
  render() {
    return (
      <div className="App">
      <h1> Bloc Chat </h1>
      <RoomList
         firebase={firebase}/>
      </div>
    );
  }
}

export default App;
