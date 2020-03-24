import React, { Component } from "react";
import Notes from "./Notes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Notes app v2</h1>
        <Notes />
      </div>
    );
  }
}

export default App;
