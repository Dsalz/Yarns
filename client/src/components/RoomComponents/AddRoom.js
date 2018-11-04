import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addRoom } from '../../actions/roomActions';

class AddRoom extends Component{

    state = {
        name : "",
        commentText: "",
        imageUrl: null,
        submitted: false
    }

    handleChange =(e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addImage = (e) =>{
        console.log(e.target.files);
    }

    showImageDialog = (e) =>{
        document.getElementById("addRoomImageInput").dispatchEvent(new MouseEvent('click'));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRoom(this.state, this.props.match.params.houseName);
        this.setState({
            submitted: true
        })
    }

    render(){
        document.title = "Add Room | Yarns";
        const { houseName } = this.props.match.params;
        const {isLoggedIn , newRoom } = this.props;
        return(!isLoggedIn) ? <Redirect to="/login"/> : (newRoom && this.state.submitted) ? <Redirect to= {"/room/" + newRoom}/> : (
            <section className="addroom-section">
                <header>
                    <h2>Add New Room</h2>
                    <p>Start up a conversation by creating a new room in the { houseName } house for people to discuss in</p>
                </header>
                <main>
                    <form onSubmit={this.handleSubmit} className="addroom-section-form">
                        <label>House: </label>
                        <input type="text" value={houseName} disabled/><br />
                        <label>Title: </label>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} required/><br />
                        <textarea placeholder="Pioneer Comment" type="text" name="commentText" onChange={this.handleChange} value={this.state.commentText} required/><br />
                        <input id="addRoomImageInput" className="addroom-section-form-addImageInput"  type="file" onChange={this.addImage} />
                        <div className="addroom-section-form-addImageBtn-wrapper">
                        {!this.state.imageUrl && <button onClick={this.showImageDialog} className="addroom-section-form-addImageBtn">+</button>}
                        </div>
                        <button className="addroom-section-form-submitbtn" type="submit">CREATE ROOM</button>
                    </form>
                </main>
            </section>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        isLoggedIn: state.user.isLoggedIn,
        newRoom: state.room.newRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRoom : (room, houseName) => dispatch(addRoom(room, houseName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);