import React, { Component } from 'react';

const button = {
  width: "90px"
}

const userGreet = {
  fontSize: "30px",
  fontWeight: "bold",
  color: "rgb(73, 73, 73)"
}

class User extends Component {
  constructor(props) {
    super(props);

  }

 handleSignIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider);

}

handleSignOut() {
  this.props.firebase.auth().signOut();
  this.props.signOut();
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
  console.log(this.props.user)
});
}

userExists() {
  if (this.props.user !== null) {
    return <p style={userGreet}> Greetings, {this.props.user.displayName} </p>
  }
  else {
    return <p style={userGreet}> Greetings, Guest </p>
       }
     }

  render() {
    return (
    <div>
     <button style={button} className="btn btn-light" onClick={() => this.handleSignIn()}>Sign In</button>
     <button style={button} className="btn btn-dark" onClick={()=> this.handleSignOut()}>Sign Out</button>
     {this.userExists()}
    </div>

    )
  }
}

export default User;
