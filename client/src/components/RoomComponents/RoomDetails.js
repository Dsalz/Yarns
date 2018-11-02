import React, { Component } from 'react';
import Comment from './Comment';

class RoomDetails extends Component{
    state = {
        comments:[
            {id: "1", message: "First Comment Yipee!" , userName: "Hypnoguy", timeCreated: new Date(), imageUrl:'/images/careerImgmax.png', roomName: "Delilah", accolades: 2, replies:[{ id: 1 ,message: "First Reply yayyy", authorName: "Undertaker"}, {id: 2 , message: "Second Reply yayyy", authorName: "Undertaker"}]},
            {id: "2", message: "First Comt Yipee!" , userName: "Hypnguy", timeCreated: new Date(), imageUrl:null, roomName: "Delilah", accolades: 0, replies:[{id: 3 ,message: "Second Reply yayyy", authorName: "Undertaker"}]},
            {id: "3", message: "First omment Yipee!" , userName: "Hpnoguy", timeCreated: new Date(), imageUrl:null, roomName: "Delilah", accolades: 2, replies:[]},
            {id: "4", message: "Fi Comment Yipee!" , userName: "Hypnguy", timeCreated: new Date(), imageUrl:null, roomName: "Delilah", accolades: 20, replies:[]},
            {id: "5", message: "Fist Cmment Yee!" , userName: "Hyguy", timeCreated: new Date(), imageUrl:null, roomName: "Delilah", accolades: 2, replies:[{id: 4 ,message: "First Reply yayyy", authorName: "Undertaker"}, {id: 5 ,message: "Second Reply yayyy", authorName: "Undertaker"}]},
        ]
    }

    render(){
        return(
            <section className="roomdetails-section">
            <header>
                <h2 className="roomdetails-section-commenttitle" tabIndex="0">Delilah</h2>
                <span className="roomdetails-section-commentno" tabIndex="0">0 Comments</span>
            </header>
            <main>
                {this.state.comments.map(comment => <Comment {...comment} key={comment.id}/>)}
            </main>
            </section>
        )
    }
}

export default RoomDetails;