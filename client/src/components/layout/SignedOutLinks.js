import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = ({hideLinks}) =>{
    return(
        <React.Fragment>
            <button className = "index-login" onClick={hideLinks}>
                        <Link to = '/login'>
                                LOGIN
                        </Link>
            </button>

            <button className = "index-signup" onClick={hideLinks}>      
                        <Link to = '/signup'>
                                SIGN UP
                        </Link>
            </button>
        </React.Fragment>
    )
}

export default SignedOutLinks;