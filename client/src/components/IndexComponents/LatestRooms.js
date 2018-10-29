import React from 'react';
import { Link } from 'react-router-dom';

const LatestRooms = ({rooms}) =>{
    return(
        <section className = "index-latestrooms">
            <h3>Latest Rooms</h3>
            { rooms.map( room => (
                <section key = {room.id} className = "index-latestrooms-item">
                    <Link to= { "/house/" + room.houseName } className = "index-latestrooms-house">
                        {room.houseName}
                    </Link>
                    <Link to = {"/room/" + room.id} className = "index-latestrooms-room">
                     {room.name}
                    </Link>
                </section>
            ))}
        </section>
    )
}

export default LatestRooms;