import React, { Component } from 'react';
import './AddPrivateRoom.css';

class AddPrivateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRoomName: "",
      pendingAuthorizedUser: "",
      authorizedUsers: [],
      areUsersBeingInputted: false
  };

      }



createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {return}
    this.props.roomsRef.push({
       name: this.state.newRoomName,
       createdBy: this.props.user.displayName,
       access: "Private",
       authorizedUsers: this.state.authorizedUsers
    });
    this.setState({ newRoomName: "",
  areUsersBeingInputted: false })
      }

handleChange(e) {
    this.setState({ newRoomName: e.target.value })
      }

handleUserChange(e) {
    this.setState({ pendingAuthorizedUser: e.target.value })
}

addUser(e) {
  e.preventDefault();
  let newState = this.state.authorizedUsers.slice();
  newState.push(this.state.pendingAuthorizedUser)
  this.setState({ authorizedUsers: newState,
  pendingAuthorizedUser: "" })
}

renderUserSelection() {
  if(this.state.authorizedUsers[0] == null) {
  let newState = []
  newState.push(this.props.user.displayName)
  this.setState({ authorizedUsers: newState }) }
  return(
    <div>
       <form onSubmit={(e) => this.addUser(e)}>
          <input type="text" onChange= { (e) => this.handleUserChange(e) } value={this.state.pendingAuthorizedUser}/>
          <input type="Submit" value="Add" readOnly className="btn btn-dark"/>
          <button onClick={() => this.returnToDefault()} className="btn btn-light">Return </button>
       </form>
       <table className="table table-bordered">
       <colgroup>
       <col id="Users" />
       </colgroup>
       <tbody>
       {this.state.authorizedUsers.map((name, index)=>
       <tr key={index}>{name}</tr>)}
       </tbody>
       </table>
    </div>
  )
}

returnToDefault() {
  this.setState({ areUsersBeingInputted: false})
}

handleUserSelection() {
  console.log("areUsersBeingInputted: true")
  this.setState({ areUsersBeingInputted: true })
}

isUserAdmin() {
  if (this.props.isAdmin == false) {
    return <p></p>
  }
  else if (this.props.isAdmin == true) {
    return (
  <div>
    <h3> Admin Controls </h3>
    <form onSubmit={(e) => this.createRoom(e)}>
      <input type="text"  value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e)}/>
      <input type="Submit" readOnly value="Create Private Room" className="btn btn-light"/>
    </form>
    <div>
    {this.state.areUsersBeingInputted == true?(this.renderUserSelection()):<button className="btn btn-light" onClick={()=> this.handleUserSelection()}> Change Allowed Users </button>}
    </div>
  </div> )
  }
}


    render(){
      return (
        <div>
        {this.isUserAdmin()}
        </div>
             )

           }

      }

export default AddPrivateRoom;
