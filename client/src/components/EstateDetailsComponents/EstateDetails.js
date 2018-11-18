import React, { Component } from 'react';
import{ Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RoomWithHouse from '../RoomComponents/RoomItemWithHouse';

import '../../css/EstateComponents/EstateDetails.css';


class EstateDetails extends Component{

    state={
        activeroomsfilter : "trending"
    }

    changeFilter = (e) =>{
        this.setState({
            activeroomsfilter : e.target.id
        })
    }

    render(){
        const { estate , houses, rooms } = this.props;
        const { activeroomsfilter } = this.state;
        document.title = `${estate.name} Estate | Yarns`;
        return(
            <section className="estatedetails-section">
                <header className = "estatedetails-section-header">
                    <div className = "estatedetails-section-header-estate">
                        <img src={estate.maxImg} alt= {estate.name} /><br />
                        <h2>
                            {estate.name}
                        </h2>
                    </div>
                    <div className = "estatedetails-section-header-houses">
                        <h3> Houses </h3>

                        <div className="estatedetails-section-header-houses-section">
                        { houses.map(house => (
                            <Link className="estatedetails-section-header-houses-section-link" to ={"/house/" + house.name} key={house.name}>
                                {house.name}
                            </Link>
                        ))}
                        </div>
                    </div>
                </header>

                <div className="estatedetails-section-rooms">
                    <h2>Rooms</h2> 

                    <div className="estatedetails-section-rooms-toggle">
                        <button className={(activeroomsfilter === "trending") ? "estatedetails-section-room-toggle-btn-active" : "estatedetails-section-room-toggle-btn"} id="trending" onClick={this.changeFilter}>
                            Trending
                        </button>
                        <button className={(activeroomsfilter === "latest") ? "estatedetails-section-room-toggle-btn-active" : "estatedetails-section-room-toggle-btn"} id="latest" onClick={this.changeFilter}>
                            Latest
                        </button>
                    </div>

                    {activeroomsfilter === "trending" && rooms.sort((a,b)=> b.commentNo - a.commentNo).map( room => <RoomWithHouse {...room} key={room._id} />)}
                    {activeroomsfilter === "latest" && rooms.sort((a,b)=> new Date(b.dateCreated) - new Date(a.dateCreated)).map( room => <RoomWithHouse {...room} key={room._id} />)}


                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    const estate = state.estate.estates.find(estate => estate.name === ownProps.match.params.estateName);
    const houses = state.house.houses.filter(house => house.estateid === estate.id);
    const housesArr = houses.reduce((a,b) => a.concat(b.name) , []);
    const rooms = state.room.rooms.filter(room => housesArr.indexOf(room.houseName) >= 0);

    return{
        estate,
        houses,
        rooms
    }
}


export default connect(mapStateToProps)(EstateDetails);