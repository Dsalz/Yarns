import React, { Component }from 'react';
import { connect } from 'react-redux';
import LandingText from './LandingText';
import ForumsCard from './ForumsCard';
import LatestRooms from './LatestRooms';
import { getLatestRoomsAction } from '../../actions/roomActions';


class IndexPage extends Component {

    componentDidMount(){
        this.props.getLatestRooms();
    }

    render(){
        document.title = "Home | Yarns";
        const { estates, houses, latestrooms } = this.props
        return(
            <React.Fragment>
                <LandingText />
                <ForumsCard estates={estates} houses={houses}/>
                <LatestRooms rooms = {latestrooms} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        estates: state.estate.estates,
        houses: state.house.houses,
        latestrooms: state.room.latestrooms
    }

}

const mapDispatchToProps = (dispatch) =>{
    return{
        getLatestRooms : () => dispatch(getLatestRoomsAction())
    }
}

export default connect( mapStateToProps , mapDispatchToProps )(IndexPage);