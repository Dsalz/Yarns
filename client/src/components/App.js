import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from './IndexComponents/IndexPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path = "/" component = {IndexPage}/>
      </Switch>
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
