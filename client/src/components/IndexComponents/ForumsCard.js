import React from 'react';

const ForumsCard = (props) =>{
    const { estates, houses } = props;
    return(
        <section className="index-forumscard">
            <h3>Forums</h3>
            {estates.map(estate => (
                <section  key = {estate.id} className= "index-forumscard-estate">
                    <a className="index-forumscard-estate-item">
                    {estate.name}
                    </a>
                    <section className="index-forumscard-houses">
                        {houses.filter(house => house.estateid === estate.id).map(house => (
                            <section key ={house.id} className= "index-forumscard-house">
                                {house.name}
                            </section>
                        ))}
                    </section>
                </section>
            ))}
        </section>
    )
}

export default ForumsCard;