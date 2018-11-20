import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoomAction , resetCurrentRoomAction } from '../../actions/roomActions';
import { getComments } from '../../actions/commentActions';


import '../../css/RoomComponents/RoomDetails.css';

class RoomDetails extends Component{

    componentDidMount(){
        this.props.resetCurrentRoom();
        const { roomName } = this.props.match.params;
        this.props.getRoom(roomName);
        this.props.getComments(roomName);
    }

    render(){
        const { roomName } = this.props.match.params;
        const { comments , room, estateName } = this.props;
        document.title = `${roomName} | Yarns`;
        return(!room.isActive) ? (
            <section className="roomdetails-section">
            <header className="roomdetails-section-header">
                <div className="roomdetails-section-commenttitle-wrapper">
                <h2 className="roomdetails-section-commenttitle" tabIndex="0"> I'm afraid this room doesn't exist or has been deleted :(</h2>
                </div>
            </header>
            </section>
        ) :(
            <section className="roomdetails-section">
            <header className="roomdetails-section-header">
                <div className="roomdetails-section-header-ogas">
                    <Link to={`/estate/${estateName}`} className="roomdetails-section-header-estate">
                        {estateName}
                    </Link>
                    /
                    <Link to={`/house/${room.houseName}`} className="roomdetails-section-header-house">
                        {room.houseName}
                    </Link>
                </div>
                <div className="roomdetails-section-commenttitle-wrapper">
                <h2 className="roomdetails-section-commenttitle" tabIndex="0">{roomName}</h2>
                </div>
                <span className="roomdetails-section-commentno" tabIndex="0"><span>{comments.length}</span> <br/> {comments.length === 1 ? "Comment" : " Comments"}</span>
            </header>
            <main>
                <Link to={"/room/" + roomName + "/add"} className="roomDetails-addcommenttop">
                    +
                </Link>
                {comments.map(comment => <Comment {...comment} key={comment._id}/>)}
            </main>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    const comments = state.comment.comments.filter(comment => comment.roomName === ownProps.match.params.roomName).sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));
    let estateName = "";
    if(state.room.currentRoom.houseName){
        estateName = state.house.houses.find(house => house.name === state.room.currentRoom.houseName).estateName;
    }

    return{
        comments,
        room : state.room.currentRoom,
        estateName
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getRoom : (name) => dispatch(getRoomAction(name)),
        getComments: (roomName) => dispatch(getComments(roomName)),
        resetCurrentRoom: () => dispatch(resetCurrentRoomAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);