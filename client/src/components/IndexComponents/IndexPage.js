import React, { Component }from 'react';
import LandingText from './LandingText';
import ForumsCard from './ForumsCard';
import LatestRooms from './LatestRooms';


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
,
        latestrooms: [
            {id: 1, houseName: "Politics", houseId: 1,  name: "Buhari Resigns"},
            {id: 2, houseName: "Jokes", houseId: 4,  name: "What did buhari say when the conductor asked him to enter with his change?"},
            {id: 3, houseName: "Job Vacancies", houseId: 6,  name: "Presidency now Vacant, interested candidates should be 70yrs and above"},
            {id: 4, houseName: "Hackathons", houseId: 1,  name: "Google & Github Lekki Hackathon"},
            {id: 5, houseName: "Freelance Work", houseId: 1,  name: "Buhari Resigns"},
            {id: 6, houseName: "Interview Experiences", houseId: 1,  name: "Buhari Resigns"},
            {id: 7, houseName: "News", houseId: 1,  name: "Buhari Resigns"},
            {id: 8, houseName: "Politics", houseId: 1,  name: "Buhari Resigns"},
        ]
    }
    render(){
        return(
            <React.Fragment>
                <LandingText />
                <ForumsCard {...this.state} />
                <LatestRooms rooms = {this.state.latestrooms} />
            </React.Fragment>
        )
    }
}

export default IndexPage;