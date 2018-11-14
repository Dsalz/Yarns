import React , { Component } from 'react';
import { connect } from 'react-redux';
import Comment from '../RoomComponents/Comment';
import { getUserCommentsAction, getCommentsUserGaveAccoladeAction } from '../../actions/commentActions'
import { getOtherUserAction, followUserAction , unfollowUserAction } from '../../actions/userActions'
import { getUserRoomsAction } from '../../actions/roomActions'
import UserItem from './UserItem';
import RoomItemWithHouse from '../RoomComponents/RoomItemWithHouse';

class OtherProfiles extends Component {

    
    componentDidMount(){
        const { username } = this.props.match.params;
        this.props.getOtherUser(username);
        this.props.getUserComments(username);
        this.props.getUserRooms(username);
        this.props.getCommentsUserGaveAccolade(username);
    }

    state = {
        activeLink : "comments"
    }

    tabUpdate = (e) =>{
        e.preventDefault();
        this.setState({
            activeLink : e.target.id
        })
    }

    render(){
        const { username } = this.props.match.params;
        document.title = `${username}'s Profile | Yarns`;
        const { activeLink } = this.state;
        const { user, comments, isLoggedIn, currentusername ,followUser, unfollowUser, currentUserFollowings, commentsUserGaveAccolades, userRoomsCreated } = this.props;
        const { name, followers, followings, roomsCreated } = user;
        let isCurrentUser = false;
        let isFollowing = false;
        if(isLoggedIn){
            isCurrentUser = currentusername === username;
            isFollowing = currentUserFollowings.indexOf(username) >= 0;
        }
        return(
            <section className="user-profile-section">
                <header className="user-profile-section-header">
                        <h2>{ username }</h2>
                        <h4> { name }</h4>
                        {(isLoggedIn && !isCurrentUser && !isFollowing) && <button className="user-profile-section-followbtn" onClick={() => followUser(username)}>{`Follow`}</button>}
                        {(isLoggedIn && !isCurrentUser && isFollowing) && <button className="user-profile-section-unfollowbtn" onClick={() => unfollowUser(username)}>{`Unfollow`}</button>}
                </header>
                <main>
                    <section className="user-profile-section-stats">
                        <a href = "#user-comments" className={activeLink === "comments" ? "active" : ""} id="comments" onClick={this.tabUpdate}>
                            <span id="comments" onClick={this.tabUpdate}> { comments.length }</span>
                           { comments.length === 1 ? "Comment" : "Comments"}
                        </a>
                        <a href="/followers" className={activeLink === "followers" ? "active" : ""} id="followers" onClick={this.tabUpdate}>
                            <span id="followers" onClick={this.tabUpdate}> { followers.length }</span>
                            Followers
                        </a>
                        <a href="/followings" className={activeLink === "followings" ? "active" : ""} id="followings" onClick={this.tabUpdate}>
                            <span id="followings" onClick={this.tabUpdate}> { followings.length }</span>
                            Followings
                        </a>
                        <a href="/roomscreated" className={activeLink === "roomsCreated" ? "active" : ""} id="roomsCreated" onClick={this.tabUpdate}>
                            <span id="roomsCreated" onClick={this.tabUpdate}> { roomsCreated }</span>
                            Rooms Created
                        </a>
                        <a href="/accolades" className={activeLink === "accoladesGiven"  ? "active" : ""} id="accoladesGiven" onClick={this.tabUpdate}>
                            <span id="accoladesGiven" onClick={this.tabUpdate}> { commentsUserGaveAccolades.length }</span>
                            Accolades Given
                        </a>
                    </section>

                    <section className = "user-profile-section-tabs">
                    { activeLink === "comments" && (
                            <React.Fragment>
                            <h3> {username}'s Comments</h3>
                            {comments.map(comment => <Comment {...comment} key={comment._id} />)} 
                            </React.Fragment>
                            )}

                        { activeLink === "followers" && (
                            <React.Fragment>
                            <h3> {username}'s Followers</h3>
                            {followers.map(username=> <UserItem username={username} key={username} />)} 
                            </React.Fragment>
                            )}
                        { activeLink === "followings" && (
                            <React.Fragment>
                            <h3> {username}'s Followings</h3>
                            {followings.map(username=> <UserItem username={username} key={username} />)} 
                            </React.Fragment>
                            )}

                        { activeLink === "roomsCreated" && (
                            <React.Fragment>
                            <h3>Rooms {username} has Created</h3>
                            {userRoomsCreated.map(room => <RoomItemWithHouse {...room} key={room._id} />)} 
                            </React.Fragment>
                            )}

                        { activeLink === "accoladesGiven" && (
                            <React.Fragment>
                            <h3>Comments ${username} has given Accolades To</h3>
                            {commentsUserGaveAccolades.map(comment => <Comment {...comment} key={comment._id} />)} 
                            </React.Fragment>
                            )}
                    </section>
                </main>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { username } = ownProps.match.params;
    return{
        user: {...state.user.otherUser},
        comments: state.comment.comments.filter(comment => comment.authorName === username).sort((a,b) => new Date(b.timeCreated) - new Date(a.timeCreated)),
        isLoggedIn: state.user.isLoggedIn,
        currentusername: state.user.user.username,
        currentUserFollowings: state.user.user.followings,
        currentUserFollowers: state.user.user.followers,
        commentsUserGaveAccolades: state.comment.commentsUserGaveAccolades,
        userRoomsCreated: state.room.userRoomsCreated
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOtherUser: (username) => dispatch(getOtherUserAction(username)),
        getUserComments: (username) => dispatch(getUserCommentsAction(username)),
        followUser: (username)=> dispatch(followUserAction(username)),
        unfollowUser: (username)=> dispatch(unfollowUserAction(username)),
        getUserRooms: (username) => dispatch(getUserRoomsAction(username)),
        getCommentsUserGaveAccolade: (username) => dispatch(getCommentsUserGaveAccoladeAction(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfiles);