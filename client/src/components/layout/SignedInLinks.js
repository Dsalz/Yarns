import React from 'react';
import { Link } from 'react-router-dom';

const SignedInLinks = ({ user, logout }) =>{
    return(
        <React.Fragment>
            <button className = "index-profile">
                        <Link to = '/profile'>
                            {user.username}
                        </Link>
            </button>

            <button className = "index-notifications">      
                        <Link to = '/notifications'>
                                Notifications
                        </Link>
            </button>

            <button className = "index-logout">      
                        <Link to="/login" onClick = {logout}>
                                Logout
                        </Link>
            </button>
        </React.Fragment>
    )
}

export default SignedInLinks;