import React from 'react';
import { Link } from 'react-router-dom';

const Reply = ({id, message, authorName, currentusername, deleteReply}) =>{
    return(
        <div className="reply">
            <div className="reply-info">
               <Link to = {'/user/' + authorName}>{authorName}</Link> 
            </div>
            <div className="reply-message">
                {message}
            </div>
            {currentusername === authorName && <button onClick={() => deleteReply(id)} className="reply-delete">&times;</button>}
        </div>
    )
}

export default Reply;