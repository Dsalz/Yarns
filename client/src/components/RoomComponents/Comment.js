import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReply, deleteReply, deleteComment, resetReplyAddedAction} from '../../actions/commentActions';
import Reply from './Reply';

class Comment extends Component {

    componentWillMount(){
        this.props.resetReplyAdded();
    }

    state = {
        showReplies : false,
        showaddReplyBox: false,
        reply: "",
        showDeleteComment: false
    }

    showDeleteComment = () => {
        this.setState({
            showDeleteComment: true
        })
    }

    hideDeleteComment = () =>{
        this.setState({
            showDeleteComment: false
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
        this.setState({
            showReplies: true,
            showaddReplyBox: false
        })
    }

    deleteComment = (id) =>{
        this.props.deleteComment(id);
    }

    deleteReply = (id) => {
        this.props.deleteReply(id, this.props._id)
    }



    render(){
        const { id, message , authorName, timeCreated, imageUrl, roomName, accolades, replies, isLoggedIn, currentusername} = this.props;
        const timeCommented = new Date(timeCreated);
        const months = ["Jan", "Feb", "Mar", "Apr", "May" , "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return(
            <React.Fragment>
            <div className="comment" onMouseEnter = {this.showDeleteComment} onMouseLeave = {this.hideDeleteComment}>
                <div className="comment-details">
                <Link className="comment-details-user" to={"/users/" + authorName}>
                    {authorName}
                </Link>
               { accolades > 0 && <span className="comment-accolades">{(accolades !== 1) ? accolades + " accolades" : accolades + " accolade"}</span>} 
                <span className="comment-timecreated-time">{timeCommented.toLocaleTimeString()}</span>                
                <span className="comment-timecreated-date">{timeCommented.getDate() + '-' + months[timeCommented.getMonth()] + "-" + String(Number(timeCommented.getYear()) + 1900)}</span>
                {(replies.length > 0 && !this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Show Replies</a>}
                {(replies.length > 0 && this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Hide Replies</a>}
                </div>
                <div className="comment-message">
                    {message}
                    {imageUrl && <div className="comment-message-image" ><img src={imageUrl} alt={roomName + " Image"} /></div>}
                    {isLoggedIn && (<div className="comment-buttons">
                        <button className="comment-button-accolades">
                            <img  className= "comment-button-img"  src="/images/generalImgmax.png" alt="reply" />                            
                        </button>

                        <button onClick={this.toggleAddReplyBox} className="comment-button-reply">
                            <img  className= "comment-button-img"  src="/images/careerImgmax.png" alt="reply" />
                        </button>
                    </div>)}
                    {(currentusername === authorName && this.state.showDeleteComment) && <button onClick={() => this.deleteComment(id)} className="comment-button-delete">x</button>}
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
        replyAdded: state.comment.replyAdded
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addReply: (reply, commentId) => dispatch(addReply(reply, commentId)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        deleteReply: (id, commentId) => dispatch(deleteReply(id, commentId)),
        resetReplyAdded: ()=> dispatch(resetReplyAddedAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);