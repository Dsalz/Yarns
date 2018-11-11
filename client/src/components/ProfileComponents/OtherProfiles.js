import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../RoomComponents/Comment';
import { getUserCommentsAction } from '../../actions/commentActions'
import { getOtherUserAction, followUserAction , unfollowUserAction } from '../../actions/userActions'

class OtherProfiles extends Component {

    
    componentDidMount(){
        const { username } = this.props.match.params;
        this.props.getOtherUser(username);
        this.props.getUserComments(username);
    }

    render(){
        document.title = `${this.props.match.params.username}'s Profile | Yarns`;
        
        const { user, comments, isLoggedIn, currentusername ,followUser, unfollowUser, currentUserFollowings } = this.props;console.log("Fromm the gan gan");
        console.log(user)
        const { username, name, accolades, followers, followings, roomsCreated } = user;
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
                        <Link to={`/user/${username}/followers`} >
                            <span> { followers.length }</span>
                            Followers
                        </Link>
                        <Link to={`/user/${username}/followings`} >
                            <span> { followings.length }</span>
                            Followings
                        </Link>
                        <Link to={`/user/${username}/roomscreated`} >
                            <span> { roomsCreated }</span>
                            Rooms Created
                        </Link>
                        <a href = "#user-comments" >
                            <span> { comments.length }</span>
                           { comments.length === 1 ? "Comment" : "Comments"}
                        </a>
                        <Link to={`/user/${username}/accolades`}>
                            <span> { accolades.length }</span>
                            Accolades Given
                        </Link>
                    </section>

                    <section className = "user-profile-section-comments" id="user-comments">
                        { comments.map(comment => <Comment {...comment} key={comment._id} />) }
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
        currentUserFollowers: state.user.user.followers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        getOtherUser: (username) => dispatch(getOtherUserAction(username)),
        getUserComments: (username) => dispatch(getUserCommentsAction(username)),
        followUser: (username)=> dispatch(followUserAction(username)),
        unfollowUser: (username)=> dispatch(unfollowUserAction(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfiles);