import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoom } from '../../actions/roomActions';
import { getComments } from '../../actions/commentActions';

class RoomDetails extends Component{

    componentDidMount(){
        const { roomName } = this.props.match.params;
        this.props.getRoom(roomName);
        this.props.getComments(roomName);
    }
    
    render(){
        const { roomName } = this.props.match.params;
        const { comments } = this.props;
        document.title = `${roomName} | Yarns`;
        return(
            <section className="roomdetails-section">
            <header className="roomdetails-section-header">
                <h2 className="roomdetails-section-commenttitle" tabIndex="0">{roomName}</h2>
                <span className="roomdetails-section-commentno" tabIndex="0">{comments.length === 1 ? "1 Comment" : comments.length + " Comments"}</span>
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
    console.log(state.comment.comments);
    const comments = state.comment.comments.filter(comment => comment.roomName === ownProps.match.params.roomName).sort((a, b) => new Date(a.timeCreated) - new Date(b.timeCreated));
    return{
        comments
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getRoom : (name) => dispatch(getRoom(name)),
        getComments: (roomName) => dispatch(getComments(roomName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);