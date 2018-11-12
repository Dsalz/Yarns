import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfileAction , resetprofileUpdatedAction, editPasswordAction , resetpasswordUpdatedAction} from '../../actions/userActions'; 
import { Redirect } from 'react-router-dom';
import Modal from '../Modal';

class EditProfilePage extends Component{

    componentDidMount(){
        this.props.resetprofileUpdated();
        this.props.resetpasswordUpdated();
    }

    state = {
        email : this.props.user.email,
        name : this.props.user.name,
        age: this.props.user.age,
        dob: this.props.user.dob,
        oldpassword: "",
        newpassword: "",
        confirmpassword : "",
        modalText : null
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmitProfile = (e) =>{
        e.preventDefault();
        const { email, name, age, dob } = this.state;
        const updatedUser = {
            email,
            name,
            age,
            dob
        }
        this.props.editProfile(updatedUser);


    }

    handleSubmitProfile = (e) =>{
        e.preventDefault();
        const { oldpassword, newpassword, confirmpassword } = this.state;
        if(oldpassword && oldpassword !== this.props.user.password){

            this.setState({
                modalText: "Password is incorrect"
            })
            return;
        }

            if(newpassword === confirmpassword){
                this.props.editPassword(newpassword);
            }
            else{
                this.setState({
                    modalText: "Password and Confirm Password not equal"
                })
            }
    }

    closeModal = () => {
        this.setState({
            modalText: null
        })
    }

    render(){
        document.title = "Edit Profile | Yarns";
        const { isLoggedIn , profileUpdated, resetprofileUpdated, passwordUpdated , resetpasswordUpdated} = this.props;
        const { name, email, age, dob } = this.state;
        return (!isLoggedIn) ? <Redirect to="/login"></Redirect> : (
            <section className="loginsection">
                {this.state.modalText && <Modal info={this.state.modalText} title="Error" close={this.closeModal} />}
                {profileUpdated && <Modal info="Profile Successfully Updated" title="Success" close={resetprofileUpdated} />}
                {passwordUpdated && <Modal info="Password Successfully Updated" title="Success" close={resetpasswordUpdated} />}
                <h2 className="loginsection-header"> Edit your Profile</h2>

                <form onSubmit= {this.handleSubmitProfile}>
                    <section className="edit-profile-section">
                    <input type="text" value={name} id="name" name="name" placeholder="Name" onChange = { this.handleChange } required/><br/>
                    <input type="email" value={email} id="email" name="email" placeholder="Email" onChange = { this.handleChange } required/><br/>
                    <input type="number" value={age} id="age" name="age" placeholder="Age" onChange = { this.handleChange } required/><br/>
                    <input type="text"value={dob} id="dob" name="dob" placeholder="Date of Birth (format: dd/mmm/yyyy)" onChange = { this.handleChange }/><br/> 
                    <button className="login-section-btn" type="submit">UPDATE PROFILE</button>
                    </section>
                </form>


                    <h3 className="edit-password-section-header">Password Change</h3>
                <form onSubmit= {this.handleSubmitPassword}>
                    <section className="edit-password-section">
                    <input type="password" id="oldpassword"  name="oldpassword" placeholder = "Old Password" onChange = { this.handleChange } /><br />
                    <input type="password" id="newpassword"  name="newpassword" placeholder = "New Password" onChange = { this.handleChange } /><br />
                    <input type="password" id="confirmpassword"  name="confirmpassword" placeholder = "Confirm Password" onChange = { this.handleChange } /><br />
                    <button className="login-section-btn" type="submit">CHANGE PASSWORD</button>
                    </section>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) =>{
    const { isLoggedIn , user, profileUpdated, passwordUpdated } = state.user;
    return{
        isLoggedIn,
        user,
        profileUpdated,
        passwordUpdated
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        editProfile : (user) => dispatch(editProfileAction(user)),
        editPassword : (password) => dispatch(editPasswordAction(pasword)),
        resetprofileUpdated: () => dispatch(resetprofileUpdatedAction()),
        resetpasswordUpdated: () => dispatch(resetpasswordUpdatedAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);