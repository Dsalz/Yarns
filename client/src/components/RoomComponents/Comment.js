import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        alert(this.state.reply);
    }



    render(){
        const { message , userName, timeCreated, imageUrl, roomName, accolades, replies} = this.props;
        return(
            <React.Fragment>
            <div className="comment">
                <div className="comment-details">
                <Link className="comment-details-user" to={"/users/" + userName}>
                    {userName}
                </Link>
                <span className="comment-accolades">{(accolades !== 1) ? accolades + " accolades" : accolades + " accolade"}</span>
                <span className="comment-timecreated-time">{timeCreated.toLocaleTimeString()}</span>                
                <span className="comment-timecreated-date">{timeCreated.getDate() + '-' + timeCreated.getMonth() + "-" + String(Number(timeCreated.getYear()) + 1900)}</span>
                {(replies.length > 0 && !this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Show Replies</a>}
                {(replies.length > 0 && this.state.showReplies) && <a href="/" className="comment-repliestoggle" onClick={this.toggleReplies}>Hide Replies</a>}
                </div>
                <div className="comment-message">
                    {message}
                    {imageUrl && <div className="comment-message-image" ><img src={imageUrl} alt={roomName + " Image"} /></div>}
                    <div className="comment-buttons">
                        <button className="comment-button-accolades">
                            &times;
                        </button>

                        <button onClick={this.toggleAddReplyBox} className="comment-button-reply">
                            &copy;
                        </button>
                    </div>
                </div>
            </div>
            {(replies.length > 0 && this.state.showReplies) && (<div className="comment-replies">
                                                        {replies.map( reply => <Reply {...reply} key={reply.id}/>)}
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

export default Comment;