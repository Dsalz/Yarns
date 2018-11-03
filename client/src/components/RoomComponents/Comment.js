import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReply, deleteReply, deleteComment} from '../../actions/commentActions';
import Reply from './Reply';

class Comment extends Component {

    state = {
        showReplies : false,
        showaddReplyBox: false,
        reply: ""
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
        this.props.addReply(this.state.reply , this.props.id);
    }

    deleteComment = (id) =>{
        this.props.deleteComment(id);
    }

    deleteReply = (id) => {
        this.props.deleteReply(id, this.props.id)
    }



    render(){
        const { id, message , userName, timeCreated, imageUrl, roomName, accolades, replies, isLoggedIn, currentusername} = this.props;
        return(
            <React.Fragment>
            <div className="comment">
                <div className="comment-details">
                <Link className="comment-details-user" to={"/users/" + userName}>
                    {userName}
                </Link>
               { accolades > 0 && <span className="comment-accolades">{(accolades !== 1) ? accolades + " accolades" : accolades + " accolade"}</span>} 
                <span className="comment-timecreated-time">{timeCreated.toLocaleTimeString()}</span>                
                <span className="comment-timecreated-date">{timeCreated.getDate() + '-' + String(Number(timeCreated.getMonth()) + 1) + "-" + String(Number(timeCreated.getYear()) + 1900)}</span>
                {(replies.length > 0 && !this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Show Replies</a>}
                {(replies.length > 0 && this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Hide Replies</a>}
                </div>
                <div className="comment-message">
                    {message}
                    {imageUrl && <div className="comment-message-image" ><img src={imageUrl} alt={roomName + " Image"} /></div>}
                    {isLoggedIn && (<div className="comment-buttons">
                        <button className="comment-button-accolades">
                            &times;
                        </button>

                        <button onClick={this.toggleAddReplyBox} className="comment-button-reply">
                            &copy;
                        </button>
                    </div>)}
                    {(currentusername === userName) && <button onClick={() => this.deleteComment(id)} className="comment-button-delete">x</button>}
                </div>
            </div>
            {(replies.length > 0 && this.state.showReplies) && (<div className="comment-replies">
                                                        {replies.map( reply => <Reply {...reply} key={reply.id} currentusername = {this.props.currentusername} deleteReply = {this.deleteReply}/>)}
                                                    </div>)}
            {this.state.showaddReplyBox && (
                <form  className="comment-reply-form" onSubmit={this.addReply}>
                    <textarea className="comment-reply-textarea" name="reply" value={this.state.reply} onChange={this.handleChange} placeholder="Enter Reply Here"/>
                    <button  className="comment-reply-btn">Send Reply</button>
                </form>
            )}
            
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isLoggedIn : state.user.isLoggedIn,
        currentusername : state.user.user.username
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addReply: (reply, commentId) => dispatch(addReply(reply, commentId)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        deleteReply: (id, commentId) => dispatch(deleteReply(id, commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);