import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ForumsCard extends Component {

    render(){
    const { estates, houses } = this.props;
    return(
        <section className="index-forumscard">
            <h3>Forums</h3>
            {estates.map((estate, index) => (
                <section  key = {estate.id} className= "index-forumscard-estate">
                    <Link to = {"/estate/" + estate.name} className="index-forumscard-estate-item">
                    <img src= {estate.img} alt={estate.name}/>
                    {estate.name}
                    </Link>
                    <section className="index-forumscard-houses">
                        {houses.filter(house => house.estateid === estate.id).map(house => (
                            <Link to = { "/house/" + house.name } key ={house.id} className= "index-forumscard-house">
                                {house.name}
                            </Link>
                        ))}
                    </section>
                </section>
            ))}
        </section>
    )
    }
}

export default ForumsCard;