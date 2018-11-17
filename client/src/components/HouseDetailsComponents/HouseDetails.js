import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getLatestRoomsAction } from '../../actions/roomActions';

import '../../css/HouseComponents/HouseDetails.css';

class HouseDetails extends Component{
    state = {

    }

    componentWillMount(){
        this.props.getLatestRooms();
    }


    render(){
        const name = this.props.match.params.houseName;
        const { rooms } = this.props;
        document.title = `${name} House | Yarns`;
        return (
            <section className="houseDetails">

                <header className="houseDetails-Header">
                    <div className ="houseDetails-Header-Name">
                        <hr className ="houseDetails-Header-Name-FirstLine"/>
                        <h2>{name}</h2>
                        <hr className ="houseDetails-Header-Name-SecondLine"/>
                    </div>

                </header>

                <main className="houseDetails-Main">

                    <Link to={"/house/" + name + "/add"} className="houseDetails-addroom">
                        +
                    </Link>

                    <div className="houseDetails-Rooms">
                    {rooms.map( room => (
                        <Link to={"/room/" + room.name} className="houseDetails-Rooms-Item" key={room._id}>
                        <span className="houseDetails-Rooms-Item-Title">{room.name}</span>
                        <span className="houseDetails-Rooms-Item-Comments">{room.commentNo}</span>
                        </Link>
                    ))}
                    </div>

                </main>

            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return{
        rooms: state.room.rooms.filter(room => room.houseName === ownProps.match.params.houseName),
        isLoggedIn : state.user.isLoggedIn
    }
}

const mapDispatchToProps =(dispatch) =>{
    return{
        getLatestRooms: () => (dispatch(getLatestRoomsAction()))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(HouseDetails);