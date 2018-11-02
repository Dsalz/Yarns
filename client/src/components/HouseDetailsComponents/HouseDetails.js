import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HouseDetails extends Component{
    state = {

    }


    render(){
        const name = this.props.match.params.houseName;
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

                    <div className="houseDetails-Rooms">
                        <Link to="" className="houseDetails-Rooms-Item">
                            <span className="houseDetails-Rooms-Item-Title">Punjabiiii</span>
                            <span className="houseDetails-Rooms-Item-Comments">10</span>
                        </Link>
                        <Link to="" className="houseDetails-Rooms-Item">
                            <span className="houseDetails-Rooms-Item-Title">Punjabiiii</span>
                            <span className="houseDetails-Rooms-Item-Comments">1</span>
                        </Link>
                        <Link to="" className="houseDetails-Rooms-Item">
                            <span className="houseDetails-Rooms-Item-Title">Punjabiiii</span>
                            <span className="houseDetails-Rooms-Item-Comments">120</span>
                        </Link>
                        <Link to="/room/jj" className="houseDetails-Rooms-Item">
                            <span className="houseDetails-Rooms-Item-Title">Punjabiiii</span>
                            <span className="houseDetails-Rooms-Item-Comments">0</span>
                        </Link>
                    </div>

                </main>

                <Link to={"/house/" + name + "/add"} className="houseDetails-addroom">
                    +
                </Link>

            </section>
        )
    }
}

export default HouseDetails;