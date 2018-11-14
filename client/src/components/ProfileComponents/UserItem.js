import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({username}) => {
    return(
        <section className="user-item">
        <Link to={'/user/' + username} className="user-item-link">
            <svg id="Layer_1" x="0px" y="0px" viewBox="0 0 258.75 258.75" ><g><g>
                    <circle cx="129.375" cy="60" r="60" data-original="#000000" fill="#ff7f00"/>
                    <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" fill="#ff7f00"/>
                </g></g> 
            </svg>
            <p>{username}</p>
        </Link>
        </section>
    )
}


export default UserItem;