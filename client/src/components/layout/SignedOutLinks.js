import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () =>{
    return(
        <React.Fragment>
            <button className = "index-login">
                        <Link to = '/login'>
                                LOGIN
                        </Link>
            </button>

            <button className = "index-signup">      
                        <Link to = '/signup'>
                                SIGN UP
                        </Link>
            </button>
        </React.Fragment>
    )
}

export default SignedOutLinks;