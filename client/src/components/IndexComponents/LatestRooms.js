import React from 'react';
import RoomItemWithHouse from '../RoomComponents/RoomItemWithHouse';
import '../../css/IndexPageComponents/LatestRooms.css';

const LatestRooms = ({rooms}) =>{
    return(
        <section className = "index-latestrooms">
            <h3>Latest Rooms</h3>
            { rooms.map( room => <RoomItemWithHouse {...room} key={room._id} />)}
        </section>
    )
}

export default LatestRooms;