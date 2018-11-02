import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IndexPage from './IndexComponents/IndexPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import EstateDetailsPage from './EstateDetailsComponents/EstateDetails';
import HouseDetailsPage from './HouseDetailsComponents/HouseDetails';
import RoomDetailsPage from './RoomComponents/RoomDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path = "/" component = {IndexPage}/>
      <Route path = "/login" component = {LoginPage}/>
      <Route path = "/signup" component = {SignUpPage}/>
      <Route exact path = "/estate/:estateName" component = {EstateDetailsPage}/>
      <Route exact path = "/house/:houseName" component={HouseDetailsPage} />
      <Route path = "/house/:houseName/add" component={SignUpPage} />
      <Route path = "/room/:roomName" component={RoomDetailsPage} />
      </Switch>
      <Footer />
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
