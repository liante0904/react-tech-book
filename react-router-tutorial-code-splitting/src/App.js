import React from 'react';
import { Route }from 'react-router-dom';
// async import { Home, About, Posts } from 'pages/index.async.js';
import { Home, About, Posts } from 'pages';
import  Menu  from './components/Menu';


const App = () => {
  return (
    <div>
      <Menu/>
      <Route exact path="/" component={Home}/>
      <Route path="/about/:name?" component={About}/>
      <Route path="/posts" component={Posts}/>
      {/*<AsyncSplitMe/>*/}
    </div>
  );
};

export default App;