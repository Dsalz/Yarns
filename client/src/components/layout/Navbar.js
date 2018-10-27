import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{

    render(){
        return(
            <nav className="index-nav">
                <Link to = "/" className="index-brand">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.89 349.46"><defs></defs><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="16.47 0.54 0 34.93 78.69 149.81 95.16 115.42 16.47 0.54"/><polygon class="cls-1" points="45.29 349.35 45.52 349.46 197.89 31.29 176.55 0.13 176.27 0 23.91 318.14 45.29 349.35"/></g></g></svg>
                </Link>
                    
                <section className = "index-navlinks">

                <button className = "index-login">
                    <Link to = '/login'>
                            LOG IN
                    </Link>
                </button>
                
                <button className = "index-signup">      
                    <Link to = '/signup'>
                            SIGN UP
                    </Link>
                </button>

                </section>
            </nav>
        )
    }
}

export default Navbar;