import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  } from '../actions/userActions'; 
import { Redirect } from 'react-router-dom';
import Modal from './Modal';

class EditProfilePage extends Component{

    state = {
        email : "",
        name : "",
        username : "",
        age: "",
        dob: "",
        password: "",
        confirmpassword : "",
        modalText : null
    }

    componentDidMount(){
        this.props.resetUsernameAvailability();
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    checkUsernameAvailability = (e) =>{
        if(e.target.value.trim().length > 0){
            this.props.checkUsernameAvailability(this.state.username);
        }else{
            this.props.resetUsernameAvailability()
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        const { password, confirmpassword} = this.state;
        if(this.props.usernameAvailable){

            if(password === confirmpassword){
                this.props.signUp(this.state);
            }
            else{
                this.setState({
                    modalText: "Password and Confirm Password not equal"
                })
            }
        }else{
            this.setState({
                modalText: "UserName not Available"
            })
        }


    }

    closeModal = () => {
        this.setState({
            modalText: null
        })
    }

    render(){
        document.title = "Sign Up | Yarns";
        const { isLoggedIn, usernameAvailable } = this.props;
        return (isLoggedIn) ? <Redirect to="/"></Redirect> : (
            <section className="loginsection">
                {this.state.modalText && <Modal info={this.state.modalText} title="Error" close={this.closeModal} />}
                <h2 className="loginsection-header">Sign up for <span className="loginsection-yarns">Yarns</span></h2>

                <form onSubmit= {this.handleSubmit}>
                    <input type="text" id="name" name="name" placeholder="Name" onChange = { this.handleChange } required/><br/>
                    <input type="email" id="email" name="email" placeholder="Email" onChange = { this.handleChange } required/><br/>
                    <input type="text" id="username" name="username" placeholder="Username" onChange = { this.handleChange } onKeyUp={ this.checkUsernameAvailability } required/>{(usernameAvailable === "loading") ? <span><img src="/images/smallLoading.gif" className="loginsection-usernamecheckingimg" title="Checking Username Availability" alt="Checking Username Availability"/></span> :(usernameAvailable === null)? <span></span> : (usernameAvailable === true)? <span><img src="/images/usernameAvailable.png" className="loginsection-usernamecheckingimg" title="Username Available" alt="Username Available"/></span> : <span><img src="/images/usernameNotAvailable.png" className="loginsection-usernamecheckingimg" alt="Username Not Available" title="Username Not Available"/></span> }<br/>
                    <input type="number" id="age" name="age" placeholder="Age" onChange = { this.handleChange } required/><br/>
                    <input type="text" id="dob" name="dob" placeholder="Date of Birth (format: dd/mmm/yyyy)" onChange = { this.handleChange }/><br/>                    
                    <input type="password" id="password"  name="password" placeholder = "Password" onChange = { this.handleChange } required/><br />
                    <input type="password" id="confirmpassword"  name="confirmpassword" placeholder = "Confirm Password" onChange = { this.handleChange } required/><br />
                    <button className="login-section-btn" type="submit">SIGN UP</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) =>{
    const { isLoggedIn , usernameAvailable } = state.user;
    return{
        isLoggedIn,
        usernameAvailable
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUp : (user) => dispatch(signUpAction(user)),
        checkUsernameAvailability : (username) => dispatch(checkUsernameAvailability(username)),
        resetUsernameAvailability: () => dispatch(resetUsernameAvailability())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);