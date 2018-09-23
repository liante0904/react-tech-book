import React, { Component } from 'react';
import MyComponent from './MyComponent';
import EventPractice from './EventPractice';
import ValidationSample from './ValidationSample';
import ScrollBox from "./ScrollBox";
import IterationSample from "./IterationSample";
import './App.css';

class App extends Component {
  render() {
    return (
    <div>
      <MyComponent/>
      <EventPractice/>
      <ValidationSample/>
      <div>
        <ScrollBox ref={(ref) => this.ScrollBox=ref}/>
        <button onClick={() => this.ScrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
      <IterationSample/>
    </div>
      );
  }
}

export default App;
