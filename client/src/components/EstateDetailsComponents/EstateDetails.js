import React, { Component } from 'react';
import { connect } from 'react-redux';


class EstateDetails extends Component{

    render(){
        const { estate , houses, rooms} = this.props;
        return(
            <section className="estatedetails-section">
                <header className = "estatedetails-section-header">
                    <div className = "estatedetails-section-header-estate">
                        <img src={estate.img} alt= {estate.name} /><br />
                        <h2>
                            {estate.name}
                        </h2>
                    </div>
                    <div className = "estatedetails-section-header-houses">
                        <h3> Houses </h3>

                        <div className="estatedetails-section-header-houses-section">
                        { houses.map(house => (
                            <a className="estatedetails-section-header-houses-section-link" href={"/house/" + house.name} key={house.name}>
                                {house.name}
                            </a>
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
                        <a className="estatedetails-section-room-item" href={"/room/" + room.name} key={room.id}>
                            {room.name}
                        </a>
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