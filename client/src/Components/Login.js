import React, { Component } from "react";
const io = require("socket.io-client");

class Login extends Component {
  constructor(props) {
    super();
    let usernamesList = [];
    this.state = {
      usernameReceived: "",
      usernamesList: usernamesList
    };
  }

  onChangeHandler(event) {
    this.setState({
      usernameReceived: event.target.value
    });
  }

  registerHandler(event) {
    event.preventDefault();
    // passing the data to server
    this.props.newUser('newUser', this.state.usernameReceived);
    this.submitUsername(this.state.usernameReceived);
  }

  submitUsername(usernameReceived) {
    let newUser = usernameReceived;
    this.setState({ usernamesList: this.state.usernamesList.push(newUser) });
  }

  render() {
    return (
      <div>
        <h1 className="display-3">Enter your name!</h1>
        <div class="form-group">
          <label for="exampleInputEmail1">Your name</label>
          <input
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            onChange={event => this.onChangeHandler(event)}
          />
        </div>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="#"
            role="button"
            onClick={event => this.registerHandler(event)}
          >
            Enter quick discussion
          </a>
        </p>
      </div>
    );
  }
}

export default Login;

// export default function () {
//     const socket = io.connect('http://localhost:3000');

//     function registerHandler(usernameReceived) {

//         socket.emit('new user', usernameReceived)
//     }

// }
