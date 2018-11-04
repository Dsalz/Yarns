import React, { Component } from 'react';
import{ Link } from 'react-router-dom';
import { connect } from 'react-redux';


class EstateDetails extends Component{

    render(){
        const { estate , houses, rooms} = this.props;
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
                        <button className="estatedetails-section-room-toggle-btn-active">
                            Trending
                        </button>
                        <button className="estatedetails-section-room-toggle-btn">
                            Latest
                        </button>
                    </div>

                    { rooms.map( room => (
                        <Link className="estatedetails-section-room-item" to={"/room/" + room.id} key={room.id}>
                            {room.name}
                        </Link>
                    ))}


                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    console.log(ownProps);
    const estate = state.estate.estates.find(estate => estate.name === ownProps.match.params.estateName);
    const houses = state.house.houses.filter(house => house.estateid === estate.id);
    const rooms = state.room.rooms.filter(room => room.estateId === estate.id);

    return{
        estate,
        houses,
        rooms
    }
}


export default connect(mapStateToProps)(EstateDetails);