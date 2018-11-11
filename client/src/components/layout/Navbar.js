import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { logoutUserAction, toggleNightMode } from '../../actions/userActions';
import { getNotificationsAction } from '../../actions/notificationActions';


class Navbar extends Component{

    componentWillUpdate(nextProps){
        if(nextProps.nightMode){
            document.body.style.setProperty('--white-color' , '#001514')
            document.body.style.setProperty('--black-color' , '#fbfffe')
            document.body.style.setProperty('--large-box-shadow' , '0px 0px 15px 2px rgba(255,127,0, 0.4)')
            document.body.style.setProperty('--small-box-shadow' , '0px 0px 5px 1px rgba(255,127,0, 0.4)')
        }else{
            document.body.style.setProperty('--white-color' , '#fbfffe')
            document.body.style.setProperty('--black-color' , '#001514')
            document.body.style.setProperty('--large-box-shadow' , '0px 0px 15px 2px rgba(0,0,0, 0.2)')
            document.body.style.setProperty('--small-box-shadow' , '0px 0px 5px 1px rgba(0,0,0, 0.2)')
        } 

        let notificationChecker;

        if(nextProps.isLoggedIn){
            if(this.props.newNotification === 'none'){
                notificationChecker = setInterval( () => {
                    this.props.getNotifications();
                }, 10000)
            }
            this.props.getNotifications();
        }else{
            clearInterval(notificationChecker);
        }
    }
    toggleNightMode = () =>{
        this.props.toggleNightMode();
    }
    render(){
        const { isLoggedIn, user, logout, nightMode, newNotification } = this.props; 
        return(
            <nav className="index-nav">
                <Link to = "/" className="index-brand">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.89 349.46"><defs></defs><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon className="cls-1" points="16.47 0.54 0 34.93 78.69 149.81 95.16 115.42 16.47 0.54"/><polygon className="cls-1" points="45.29 349.35 45.52 349.46 197.89 31.29 176.55 0.13 176.27 0 23.91 318.14 45.29 349.35"/></g></g></svg>
                </Link>
                    {!nightMode && <img src="/images/lightsOut.png" onClick={this.toggleNightMode} className="index-nav-night-toggle" alt="lights-out" title="Lights Out" />}
                    {nightMode && <img src="/images/lightsOn.png" onClick={this.toggleNightMode} className="index-nav-night-toggle" alt="lights-on" title="Lights On" />}
                <section className = "index-navlinks">
                {(!isLoggedIn) ? <SignedOutLinks /> : <SignedInLinks newNotification = {newNotification} user = {user} logout = {logout} />}
                

                </section>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user,
        nightMode: state.user.nightMode,
        newNotification: state.notification.newNotification
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        logout: () => dispatch(logoutUserAction()),
        toggleNightMode : () => dispatch(toggleNightMode()),
        getNotifications: () => dispatch(getNotificationsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);