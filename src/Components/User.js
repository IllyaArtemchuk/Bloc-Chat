import React, { Component } from 'react';

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
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
});
}

userExists() {
  if (this.props.user !== null) {
    return <p> Greetings, {this.props.user.displayName} </p>
  }
  else {
    return <p> Greetings, Guest </p>
       }
     }

  render() {
    return (
    <div>
     <button onClick={() => this.handleSignIn()}>Sign In</button>
     <button onClick={()=> this.handleSignOut()}>Sign Out</button>
     {this.userExists()}
    </div>

    )
  }
}

export default User;
