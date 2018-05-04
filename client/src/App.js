import React, { Component } from "react";
import "./App.css";
import io from "socket.io-client";
import Login from "../src/Components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.emit = this.emit.bind(this);
    
  }

  componentDidMount() {
    this.socket = io.connect("http://localhost:3001");
    this.socket.on('display name', data => {
      console.log(data)
    })
  }
  
  emit(event, data){
    this.socket.emit(event, data)
  };

  

  

  render() {
    return (
      <div className="container">
        <Login newUser={this.emit} />
      </div>
    );
  }
}

export default App;
