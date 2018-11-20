import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../css/RoomComponents/RoomWithHouse.css';
import { deleteRoomAction } from '../../actions/roomActions';

class RoomItemWithHouse extends Component{

    render(){
        const { _id, houseName, name, commentNo, currentusername, deleteRoom } = this.props;
            return(
                <section className = "roomwithhouse-item">
                            <Link to= { "/house/" + houseName } className = "roomwithhouse-house">
                                {houseName}
                            </Link>
                            <Link to = {"/room/" + name} className = "roomwithhouse-room">
                             {name}
                             {currentusername !== "Dsalz" && <span title="No of Comments">{commentNo}</span>}
                             {currentusername === "Dsalz" && <span onClick = {() => deleteRoom(_id)}>x</span>}
                            </Link>
                </section>
            )
    }
}


const mapStateToProps = (state) => {
    return{
        isLoggedIn : state.user.isLoggedIn,
        currentusername : state.user.user.username
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        deleteRoom: (id) => dispatch(deleteRoomAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomItemWithHouse);



