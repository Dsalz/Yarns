import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReply, deleteReply, deleteComment, resetReplyAddedAction, giveAccolade, removeAccolade} from '../../actions/commentActions';
import Reply from './Reply';
import Modal from '../Modal';

import '../../css/RoomComponents/Comment.css';

class Comment extends Component {


    state = {
        showReplies : false,
        showaddReplyBox: false,
        reply: "",
        showAltOptions: false,
        showDeleteCommentModal: false,
    }

    showAltOptions = () => {
        this.setState({
            showAltOptions: true
        })
    }

    hideAltOptions = () =>{
        this.setState({
            showAltOptions: false
        })
    }

    showDeleteCommentModal = () => {
        this.setState({
            showDeleteCommentModal: true
        })
    }

    hideDeleteCommentModal = () => {
        this.setState({
            showDeleteCommentModal: false
        })
    }

    toggleReplies = (e) =>{
        e.preventDefault();
        this.setState({
            showReplies: !this.state.showReplies
        })
    }

    toggleAddReplyBox = (e) =>{
        e.preventDefault();
        this.setState({
            showaddReplyBox: !this.state.showaddReplyBox
        })
    }

    handleChange= (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addReply = (e) =>{
        e.preventDefault();
        this.props.addReply(this.state.reply , this.props._id);
        
    }

    deleteComment = (id) =>{
        this.props.deleteComment(id);
    }

    deleteReply = (id) => {
        this.props.deleteReply(id, this.props._id)
    }

    closeReplyAddedModal = () => {
        this.props.resetReplyAdded();
        this.setState({
            showReplies: true,
            showaddReplyBox: false
            })
    }




    render(){
        const { _id, message , authorName, timeCreated, imageUrl, imageName, roomName, accolades, replies, isLoggedIn, currentusername, replyAdded, giveAccolade , removeAccolade, userAccolades} = this.props;
        const timeCommented = new Date(timeCreated);
        let accoladeGiven = null;
        if(isLoggedIn){
           accoladeGiven  = userAccolades.indexOf(_id) >= 0; 
        }
        const months = ["Jan", "Feb", "Mar", "Apr", "May" , "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return(
            <React.Fragment>
            <div className="comment" onMouseEnter = {this.showAltOptions} onMouseLeave = {this.hideAltOptions}>
            {replyAdded && <Modal info="Reply Added Succesfully" title="Success" close={this.closeReplyAddedModal} />}
            {this.state.showDeleteCommentModal && <Modal info="Are you sure you want to delete this comment?" title="Delete Comment" close={this.hideDeleteCommentModal} options = {true} optionAFunc={this.hideDeleteCommentModal} optionAText = "Close" optionBFunc={() => this.deleteComment(_id)} optionBText = "Delete"/>}
                <div className="comment-details">
                <Link className="comment-details-user" to={"/user/" + authorName}>
                    {authorName}
                </Link>
               { accolades > 0 && <span className="comment-accolades">{accolades}{(<svg className="comment-accolades-svg" viewBox="0 0 512 512" ><g><g>
                                <g>
                                    <path d="M486.4,25.6h-76.8V0H102.4v25.6H25.6C10.24,25.6,0,35.84,0,51.2v61.44c0,58.88,43.52,107.52,102.4,115.2v2.56    c0,74.24,51.2,135.68,120.32,151.04L204.8,435.2h-58.88c-10.24,0-20.48,7.68-23.04,17.92L102.4,512h307.2l-20.48-58.88    c-2.56-10.24-12.8-17.92-23.04-17.92H307.2l-17.92-53.76c69.12-15.36,120.32-76.8,120.32-151.04v-2.56    c58.88-7.68,102.4-56.32,102.4-115.2V51.2C512,35.84,501.76,25.6,486.4,25.6z M102.4,176.64c-28.16-7.68-51.2-33.28-51.2-64V76.8    h51.2V176.64z M307.2,256L256,227.84L204.8,256l12.8-51.2l-38.4-51.2h53.76L256,102.4l23.04,51.2h53.76l-38.4,51.2L307.2,256z     M460.8,112.64c0,30.72-23.04,58.88-51.2,64V76.8h51.2V112.64z"/>
                                </g>
               </g></g> </svg>) }</span>} 
                {(replies.length > 0 && !this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Show Replies</a>}
                {(replies.length > 0 && this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Hide Replies</a>}
                <div className = "comment-timecreated">
                <span className="comment-timecreated-time">{timeCommented.toLocaleTimeString()}</span>                
                <span className="comment-timecreated-date">{timeCommented.getDate() + '-' + months[timeCommented.getMonth()] + "-" + String(Number(timeCommented.getYear()) + 1900)}</span>
                </div>
                </div>
                <div className="comment-message">
                <Link className="comment-room" to = {`/room/${roomName}`}>
                    {roomName}
                </Link>
                    {message}
                    {imageUrl && <div className="comment-message-image" ><img src={imageUrl} alt={imageName} /></div>}
                    {isLoggedIn && (<div className="comment-buttons">
                       { !accoladeGiven && <button onClick={() => giveAccolade(_id)} className="comment-button-accolades">
                            <svg className="comment-button-svg"  id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" ><g><g>
                                <g>
                                    <path d="M486.4,25.6h-76.8V0H102.4v25.6H25.6C10.24,25.6,0,35.84,0,51.2v61.44c0,58.88,43.52,107.52,102.4,115.2v2.56    c0,74.24,51.2,135.68,120.32,151.04L204.8,435.2h-58.88c-10.24,0-20.48,7.68-23.04,17.92L102.4,512h307.2l-20.48-58.88    c-2.56-10.24-12.8-17.92-23.04-17.92H307.2l-17.92-53.76c69.12-15.36,120.32-76.8,120.32-151.04v-2.56    c58.88-7.68,102.4-56.32,102.4-115.2V51.2C512,35.84,501.76,25.6,486.4,25.6z M102.4,176.64c-28.16-7.68-51.2-33.28-51.2-64V76.8    h51.2V176.64z M307.2,256L256,227.84L204.8,256l12.8-51.2l-38.4-51.2h53.76L256,102.4l23.04,51.2h53.76l-38.4,51.2L307.2,256z     M460.8,112.64c0,30.72-23.04,58.88-51.2,64V76.8h51.2V112.64z"/>
                                </g>
                            </g></g> </svg>
                        </button>}

                        {accoladeGiven && <button onClick={() => removeAccolade(_id)} className="comment-button-accolades-given">
                            <svg className="comment-button-svg"  id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" ><g><g>
                                <g>
                                    <path d="M486.4,25.6h-76.8V0H102.4v25.6H25.6C10.24,25.6,0,35.84,0,51.2v61.44c0,58.88,43.52,107.52,102.4,115.2v2.56    c0,74.24,51.2,135.68,120.32,151.04L204.8,435.2h-58.88c-10.24,0-20.48,7.68-23.04,17.92L102.4,512h307.2l-20.48-58.88    c-2.56-10.24-12.8-17.92-23.04-17.92H307.2l-17.92-53.76c69.12-15.36,120.32-76.8,120.32-151.04v-2.56    c58.88-7.68,102.4-56.32,102.4-115.2V51.2C512,35.84,501.76,25.6,486.4,25.6z M102.4,176.64c-28.16-7.68-51.2-33.28-51.2-64V76.8    h51.2V176.64z M307.2,256L256,227.84L204.8,256l12.8-51.2l-38.4-51.2h53.76L256,102.4l23.04,51.2h53.76l-38.4,51.2L307.2,256z     M460.8,112.64c0,30.72-23.04,58.88-51.2,64V76.8h51.2V112.64z"/>
                                </g>
                            </g></g> </svg>
                        </button>}


                        <button onClick={this.toggleAddReplyBox} className={ this.state.showaddReplyBox ?  "comment-button-reply-showing": "comment-button-reply"}>
                            <svg className="comment-button-svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" ><g><g>
                                <g>
                                    <path d="M511.563,434.259c-1.728-142.329-124.42-258.242-277.087-263.419V95.999c0-17.645-14.342-31.999-31.974-31.999    c-7.931,0-15.591,3.042-21.524,8.562c0,0-134.828,124.829-173.609,163.755C2.623,241.109,0,248.088,0,255.994    c0,7.906,2.623,14.885,7.369,19.687c38.781,38.915,173.609,163.745,173.609,163.745c5.933,5.521,13.593,8.562,21.524,8.562    c17.631,0,31.974-14.354,31.974-31.999v-74.591c153.479,2.156,255.792,50.603,255.792,95.924c0,5.896,4.767,10.666,10.658,10.666    c0.167,0.021,0.333,0.01,0.416,0c5.891,0,10.658-4.771,10.658-10.666C512,436.259,511.854,435.228,511.563,434.259z"/>
                                </g>
                            </g></g> </svg>
                        </button>
                    </div>)}
                    {(currentusername === authorName && this.state.showAltOptions) && <button onClick={this.showDeleteCommentModal} className="comment-button-delete">x</button>}
                </div>
            </div>
            {(replies.length > 0 && this.state.showReplies) && (<div className="comment-replies">
                                                        {replies.map( reply => <Reply {...reply} key={reply._id} currentusername = {this.props.currentusername} deleteReply = {this.deleteReply}/>)}
                                                    </div>)}
            {this.state.showaddReplyBox && (
                <form  className="comment-reply-form" onSubmit={this.addReply}>
                    <textarea className="comment-reply-textarea" name="reply" value={this.state.reply} onChange={this.handleChange} placeholder="Enter Reply Here"/>
                    <button  className="comment-reply-btn" type="submit" >Send Reply</button>
                </form>
            )}
            
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isLoggedIn : state.user.isLoggedIn,
        currentusername : state.user.user.username,
        replyAdded: state.comment.replyAdded,
        userAccolades: state.user.user.accolades
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addReply: (reply, commentId) => dispatch(addReply(reply, commentId)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        deleteReply: (id, commentId) => dispatch(deleteReply(id, commentId)),
        resetReplyAdded: ()=> dispatch(resetReplyAddedAction()),
        giveAccolade: (commentId) => dispatch(giveAccolade(commentId)),
        removeAccolade: (commentId) => dispatch(removeAccolade(commentId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);