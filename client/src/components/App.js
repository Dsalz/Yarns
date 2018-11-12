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
import NotificationsPage from './NotificationsComponents/Notifications';
import UserProfilePage from './ProfileComponents/UserProfile';
import OtherUserProfilePage from './ProfileComponents/OtherProfiles';
import EditProfilePage from './ProfileComponents/EditProfile';
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
      <Route path= "/notifications" component={NotificationsPage} />
      <Route exact path = "/profile" component={UserProfilePage} />
      <Route path = "/user/:username" component={OtherUserProfilePage} />
      <Route path = "/editprofile" component={EditProfilePage} />
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
