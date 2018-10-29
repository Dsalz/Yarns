import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpAction } from '../actions/userActions'; 
import { Redirect } from 'react-router-dom';

class SignUpPage extends Component{

    state = {
        email : "",
        name : "",
        username : "",
        age: "",
        DOB: "",
        password: "",
        confirmpassword : "",
        isActive: true
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        const { password, confirmpassword} = this.state;
        if(password === confirmpassword){
            this.props.signUp(this.state);
        }
        else{
            alert("Password and Confirm Password not equal")
        }


    }

    render(){
        const { isLoggedIn } = this.props;
        return (isLoggedIn) ? <Redirect to="/"></Redirect> : (
            <section className="loginsection">

                <h2>Sign up for <span className="loginsection-yarns">Yarns</span></h2>

                <form onSubmit= {this.handleSubmit}>
                    <input type="text" id="name" name="name" placeholder="Name" onChange = { this.handleChange } required/><br/>
                    <input type="email" id="email" name="email" placeholder="Email" onChange = { this.handleChange } required/><br/>
                    <input type="text" id="username" name="username" placeholder="Username" onChange = { this.handleChange } required/><br/>
                    <input type="number" id="age" name="age" placeholder="Age" onChange = { this.handleChange } required/><br/>
                    <input type="text" id="DOB" name="DOB" placeholder="Date of Birth (format: dd/mmm/yyyy)" onChange = { this.handleChange }/><br/>                    
                    <input type="password" id="password"  name="password" placeholder = "Password" onChange = { this.handleChange } required/><br />
                    <input type="password" id="confirmpassword"  name="confirmpassword" placeholder = "Confirm Password" onChange = { this.handleChange } required/><br />
                    <button type="submit">SIGN UP</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        isLoggedIn : state.user.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUp : (user) => dispatch(signUpAction(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);