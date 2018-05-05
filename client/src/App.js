import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import io from "socket.io-client";
import Login from "../src/Components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ""
    };
    this.emit = this.emit.bind(this);
  }

  componentDidMount() {
    this.socket = io.connect("http://localhost:3001");
    this.socket.on("display name", data => {
      this.setState({ currentUser: data });
    });
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  render() {
    console.log(this.state.currentUser);
    return (
      <BrowserRouter>
      <div className="container">
        <Login newUser={this.emit} {...this.state} />
        <Route exactpath="/chat" component={ChatContainer}/>
      </div>
      <BrowserRouter/>
    );
  }
}

export default App;
