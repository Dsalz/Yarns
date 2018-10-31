import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from './IndexComponents/IndexPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import EstateDetailsPage from './EstateDetailsComponents/EstateDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path = "/" component = {IndexPage}/>
      <Route exact path = "/login" component = {LoginPage}/>
      <Route exact path = "/signup" component = {SignUpPage}/>
      <Route exact path = "/estate/:estateName" component = {EstateDetailsPage}/>
      </Switch>
      <Footer />
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
