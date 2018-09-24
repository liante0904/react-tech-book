import React, { Component } from 'react';
import LifeCycleSample from './LifeCycleSample';
import Hello from './Hello';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
class App extends Component {
  state = {
    color: '#000000',
    name: 'functional component'
  }
  
  handleClick = () => {
    this.setState({
      color: getRandomColor()
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color}/>
        <Hello name={this.state.name}/>
      </div>
    );
  }
}

export default App;
