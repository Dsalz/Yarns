import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { logoutUserAction } from '../../actions/userActions';


class Navbar extends Component{

    render(){
        const { isLoggedIn, user, logout } = this.props; 
        return(
            <nav className="index-nav">
                <Link to = "/" className="index-brand">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.89 349.46"><defs></defs><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon className="cls-1" points="16.47 0.54 0 34.93 78.69 149.81 95.16 115.42 16.47 0.54"/><polygon className="cls-1" points="45.29 349.35 45.52 349.46 197.89 31.29 176.55 0.13 176.27 0 23.91 318.14 45.29 349.35"/></g></g></svg>
                </Link>
                    
                <section className = "index-navlinks">
                {(!isLoggedIn) ? <SignedOutLinks /> : <SignedInLinks user = {user} logout = {logout} />}
                

                </section>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        logout: () => dispatch(logoutUserAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);