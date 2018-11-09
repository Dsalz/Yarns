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
import AddRoomPage from'./RoomComponents/AddRoom';
import AddCommentPage from './RoomComponents/AddComment';
import { connect } from 'react-redux';
import {  checkLoginStatusAction } from '../actions/userActions';


class App extends Component {

  componentDidMount(){
    this.props.checkLoginStatus()
  }

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
      <Route exact path = "/room/:roomName" component={RoomDetailsPage} />
      <Route path = "/house/:houseName/add" component={AddRoomPage} />
      <Route path = "/room/:roomName/add" component={AddCommentPage} />
      <Route path= "/notifications" component={Notifications} />
      </Switch>
      <Footer />
      </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    checkLoginStatus: () => dispatch(checkLoginStatusAction())
  }
}

export default connect(null, mapDispatchToProps)(App);
