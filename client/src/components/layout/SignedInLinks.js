import React from 'react';
import { Link } from 'react-router-dom';

const SignedInLinks = ({ user, logout, newNotification, hideLinks }) =>{
    return(
        <React.Fragment>
            <button className = "index-notifications" onClick={hideLinks}>      
                        <Link to = '/notifications'>
                        {!newNotification && <svg version="1.1" id="Capa_1" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 510 510"><g><g>
                            <g id="notifications">
                                <path d="M255,510c28.05,0,51-22.95,51-51H204C204,487.05,226.95,510,255,510z M420.75,357V216.75    c0-79.05-53.55-142.8-127.5-160.65V38.25C293.25,17.85,275.4,0,255,0c-20.4,0-38.25,17.85-38.25,38.25V56.1    c-73.95,17.85-127.5,81.6-127.5,160.65V357l-51,51v25.5h433.5V408L420.75,357z" data-original="#000000" fill="#ff7f00"/>
                            </g>
                        </g></g> 
                        </svg>}

                        {newNotification && <svg version="1.1" id="Capa_1" x="0px" y="0px" width="22px" height="22px" className="newnotification"viewBox="0 0 510 510"><g><g>
                            <g id="notifications">
                                <path d="M255,510c28.05,0,51-22.95,51-51H204C204,487.05,226.95,510,255,510z M420.75,357V216.75    c0-79.05-53.55-142.8-127.5-160.65V38.25C293.25,17.85,275.4,0,255,0c-20.4,0-38.25,17.85-38.25,38.25V56.1    c-73.95,17.85-127.5,81.6-127.5,160.65V357l-51,51v25.5h433.5V408L420.75,357z" data-original="#000000" fill="#ff7f00"/>
                            </g>
                        </g></g> 
                        </svg>}
                        </Link>
            </button>

            <button className = "index-profile" onClick={hideLinks}>
                        <Link to = '/profile'>
                        <svg id="Layer_1" x="0px" y="0px" viewBox="0 0 258.75 258.75"  width="22px" height="22px"><g><g>
                            <circle cx="129.375" cy="60" r="60" data-original="#000000" fill="#ff7f00"></circle>
                            <path d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z" data-original="#000000" fill="#ff7f00"></path>
                        </g></g> 
                        </svg>
                            {user.username}
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