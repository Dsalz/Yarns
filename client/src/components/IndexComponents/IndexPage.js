import React, { Component }from 'react';
import LandingText from './LandingText';
import ForumsCard from './ForumsCard';


class IndexPage extends Component {

    state = {
        estates: [
            {id: 1, name: "General"},
            {id: 2, name: "Entertainment"},
            {id: 3, name: "Career"}
        ],
        houses: [
            {id: 1, estateid : 1, name: "Politics"},
            {id: 2, estateid : 1, name: "Travel"},
            {id: 3, estateid : 1, name: "Food"},
            {id: 4, estateid : 2, name: "Jokes"},
            {id: 5, estateid : 2, name: "Tv"},
            {id: 6, estateid : 3, name: "Job Vacancies"},
            {id: 7, estateid : 3, name: "Career Fairs"},
            {id: 8, estateid : 3, name: "Freelance Work"},
            {id: 9, estateid : 3, name: "Hackathons"},
            {id: 10, estateid : 3, name: "Interview Experiences"},
        ]
    }
    render(){
        return(
            <React.Fragment>
                <LandingText />
                <ForumsCard {...this.state} />
            </React.Fragment>
        )
    }
}

export default IndexPage;