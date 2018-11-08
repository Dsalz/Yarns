import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Reply extends Component {

    state = {
        showDeleteReply: false
    }

    showDeleteReply = () =>{
        this.setState({
            showDeleteReply: true
        })
    }

    hideDeleteReply = () =>{
        this.setState({
            showDeleteReply: false
        })
    }

    render() {
        const {_id, message, authorName, currentusername, deleteReply} = this.props;
        return(
            <div className="reply" onMouseEnter={this.showDeleteReply} onMouseLeave={this.hideDeleteReply}>
                <div className="reply-info">
                   <Link to = {'/user/' + authorName}>{authorName}</Link> 
                </div>
                <div className="reply-message">
                    {message}
                {(currentusername === authorName && this.state.showDeleteReply) && <button onClick={() => deleteReply(_id)} className="reply-delete">x</button>}
                </div>
            </div>
        )
    }
}

export default Reply;