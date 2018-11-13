import React from 'react'
import { Link } from 'react-router-dom';

const RoomItemWithHouse = ({ houseName, name}) =>{
    return(
        <section className = "roomwithhouse-item">
                    <Link to= { "/house/" + houseName } className = "roomwithhouse-house">
                        {houseName}
                    </Link>
                    <Link to = {"/room/" + name} className = "roomwithhouse-room">
                     {name}
                    </Link>
        </section>
    )
}



export default RoomItemWithHouse;


