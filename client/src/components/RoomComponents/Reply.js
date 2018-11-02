import React from 'react';
import { Link } from 'react-router-dom';

const Reply = ({message, authorName}) =>{
    return(
        <div className="reply">
            <div className="reply-info">
               <Link to = {'/user/' + authorName}>{authorName}</Link> 
            </div>
            <div className="reply-message">
                {message}
            </div>
        </div>
    )
}

export default Reply;