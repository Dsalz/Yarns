import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addRoomAction } from '../../actions/roomActions';
import { storeImgAction , resetImgUrlAction } from '../../actions/commentActions';

import LoadingScreen from '../LoadingScreen';

import '../../css/RoomComponents/AddRoom.css';

class AddRoom extends Component{

    state = {
        name : "",
        commentText: "",
        submitted: false
    }

    handleChange =(e) => {
        let value = e.target.value;

        if(value.indexOf('?') === -1){
            this.setState({
                [e.target.name] : value
            })
        }
    }

    addImage = (e) =>{
        const fileForm = new FormData();
        
        fileForm.append('file', e.target.files[0])

        this.props.storeImg(fileForm);
    }

    showImageDialog = (e) =>{
        e.preventDefault();
        document.getElementById("addRoomImageInput").dispatchEvent(new MouseEvent('click'));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const imageInfo = this.props.newCommentImg || {};
        this.state.name.trim();
        this.state.commentText.trim();
        this.props.addRoom(this.state, this.props.match.params.houseName ,imageInfo);
        this.setState({
            submitted: true
        })
    }

    render(){
        document.title = "Add Room | Yarns";
        const { houseName } = this.props.match.params;
        const {isLoggedIn , newRoom, loading, newCommentImg } = this.props;
        return(!isLoggedIn) ? <Redirect to="/login"/> : (newRoom && this.state.submitted) ? <Redirect to= {"/room/" + newRoom}/> : (
            <section className="addroom-section">
                {loading && <LoadingScreen />}
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
                        {!newCommentImg && (<button onClick={this.showImageDialog} className="addroom-section-form-addImageBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" x="0px" y="0px" viewBox="0 0 58 58" className="addroom-section-form-addImageBtn-svg"><g><path d="M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M16,17  c3.071,0,5.569,2.498,5.569,5.569c0,3.07-2.498,5.568-5.569,5.568s-5.569-2.498-5.569-5.568C10.431,19.498,12.929,17,16,17z   M52.737,35.676c-0.373,0.406-1.006,0.435-1.413,0.062L40.063,25.414l-9.181,10.054l4.807,4.807c0.391,0.391,0.391,1.023,0,1.414  s-1.023,0.391-1.414,0L23.974,31.389L7.661,45.751C7.471,45.918,7.235,46,7,46c-0.277,0-0.553-0.114-0.751-0.339  c-0.365-0.415-0.325-1.047,0.09-1.412l17.017-14.982c0.396-0.348,0.994-0.329,1.368,0.044l4.743,4.743l9.794-10.727  c0.179-0.196,0.429-0.313,0.694-0.325c0.264-0.006,0.524,0.083,0.72,0.262l12,11C53.083,34.636,53.11,35.269,52.737,35.676z"/></g> </svg>                                                
                        </button>)}
                        </div>
                        {newCommentImg && <img className="newcommentimg"src={newCommentImg.url} alt={newCommentImg.name}/>}
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
        newRoom: state.room.newRoom,
        newCommentImg : state.comment.newCommentImg,
        loading: state.user.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRoom : (room, houseName, imgInfo ) => dispatch(addRoomAction(room, houseName , imgInfo)),
        storeImg : (fileForm) => dispatch(storeImgAction(fileForm)),
        resetImgUrl : () => dispatch(resetImgUrlAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);