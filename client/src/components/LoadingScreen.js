import React from 'react';
import '../css/LoadingScreen.css'

const LoadingScreen = () => {
    return(
        <div className="loading-screen">
            <div className="loading-screen-spec">
                <span className="loading-screen-spec-pulse"></span>
                <span className="loading-screen-spec-dot"></span>
            </div>
        </div>
    )

}


export default LoadingScreen;