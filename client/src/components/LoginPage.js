import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/userActions';
import { Redirect } from 'react-router-dom';

import Modal from './Modal';

class LoginPage extends Component{

    state = {
        email : "",
        password: "",
        submitted: false
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value,
            submitted: false
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.login(this.state);
        this.setState({
            submitted: true
        })
    }

    closeModal = () => {
        this.setState({
            submitted: false
        })
    }

    render(){
        document.title = "Login | Yarns";
        const {isLoggedIn , userExists , loggingIn} = this.props;

        return (isLoggedIn) ? <Redirect to="/"></Redirect> : (
            <section className="loginsection">
                {(userExists === false && this.state.submitted) && <Modal info="Invalid Credentials" title="Error" close={this.closeModal} />}
                {loggingIn && (<div className="logging-in-svg">
                                <span>Loading</span>
                              </div>) }
                <h2 className="loginsection-header">Login to <span className="loginsection-yarns">Yarns</span></h2>

                <form onSubmit= {this.handleSubmit}>
                    <input type="text" id="email" name="email" placeholder="Email/Username" onChange = { this.handleChange } required/><br/>
                    <input type="password" id="password"  name="password" placeholder = "Password" onChange = { this.handleChange } required/><br />
                    <button className="login-section-btn" type="submit">LOGIN</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {

    const { isLoggedIn , userExists , loggingIn} = state.user;

    return {
        isLoggedIn,
        userExists,
        loggingIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(loginAction(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);