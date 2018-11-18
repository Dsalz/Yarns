import React from 'react'
import { Link } from 'react-router-dom';

import '../../css/RoomComponents/RoomWithHouse.css';

const RoomItemWithHouse = ({ houseName, name, commentNo }) =>{
    return(
        <section className = "roomwithhouse-item">
                    <Link to= { "/house/" + houseName } className = "roomwithhouse-house">
                        {houseName}
                    </Link>
                    <Link to = {"/room/" + name} className = "roomwithhouse-room">
                     {name}
                     <span>{commentNo}</span>
                    </Link>
        </section>
    )
}



export default RoomItemWithHouse;


