import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions/userActions';
import { Redirect } from 'react-router-dom';

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

    render(){
        const {isLoggedIn , userExists } = this.props;

        if(!userExists && this.state.submitted){
            alert("Invalid Email/Password");
        }

        return (isLoggedIn) ? <Redirect to="/"></Redirect> : (
            <section className="loginsection">

                <h2>Login to <span className="loginsection-yarns">Yarns</span></h2>

                <form onSubmit= {this.handleSubmit}>
                    <input type="email" id="email" name="email" placeholder="Email" onChange = { this.handleChange }/><br/>
                    <input type="password" id="password"  name="password" placeholder = "Password" onChange = { this.handleChange }/><br />
                    <button type="submit">LOGIN</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userExists: state.user.userExists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(loginAction(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);