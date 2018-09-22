import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";
import RoomList from "./Components/RoomList";
import MessageList from "./Components/MessageList";
import User from "./Components/User";


const Header = {
  backgroundColor:"rgb(167, 171, 178)",
  fontSize: "1000px"
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
      activeRoom: "",
      user: "",
      isAdmin: false
    };

    this.adminCredentials = ["Ilya Artemchuk", "ilyalinkis@gmail.com"]
  }

  changeRoom(room) {
    this.setState({ activeRoom: room});
  }

  isUserAdmin(user) {
    if (this.adminCredentials.includes(this.state.user.displayName, this.state.user.email)) {
      return "User is Admin"
    }
    else {return "User is Not"}
  }

  setUser(user) {
    this.setState({ user: user});
    if (this.isUserAdmin(user) == "User is Admin") {
      this.setState({ isAdmin: true })
    } }



signOut =()=> {
     this.setState({ isAdmin: false })
   }





  render() {
    return (
      <div className="App">
      <div className="jumbotron text-center" style={Header}>
      <h1 > Bloc Chat </h1>
      <h3> Chat with your friends! </h3>
      </div>
      <div className="container-fluid">
      <div className="row">
      <RoomList className="col-sm-4"
         firebase={firebase} changeRoom={this.changeRoom.bind(this)} user={ this.state.user } isAdmin={ this.state.isAdmin }/>

      <MessageList className="col-sm-8" activeRoomID={this.state.activeRoom.key} activeRoom={this.state.activeRoom} firebase={firebase} user={ this.state.user } isAdmin={this.state.isAdmin}/>
      </div>
      <div className="row" >
      <div className="col-sm-5">
      </div>
      <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} signOut={this.signOut}/>
      </div>
      </div>
      </div>
    );
  }
}

export default App;
