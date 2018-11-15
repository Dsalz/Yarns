import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Comment from '../RoomComponents/Comment';
import { getUserCommentsAction , getCommentsUserGaveAccoladeAction } from '../../actions/commentActions'
import { updateUserAction } from '../../actions/userActions'
import { getUserRoomsAction } from '../../actions/roomActions'
import UserItem from './UserItem';
import RoomItemWithHouse from '../RoomComponents/RoomItemWithHouse';

import '../../css/ProfileComponents/UserProfile.css';

class UserProfile extends Component {

    componentDidMount(){
        this.props.updateUser();
        this.props.getUserComments();
        this.props.getUserRooms();
        this.props.getCommentsUserGaveAccolade();
    }

    state = {
        activeLink : "comments"
    }

    tabUpdate = (e) =>{
        e.preventDefault();
        console.log(e.target);
        this.setState({
            activeLink : e.target.id
        })
    }

    render(){
        document.title = "Your Profile | Yarns";
        const { user, myComments, isLoggedIn , myRoomsCreated, commentsIGaveAccolade} = this.props;
        const { activeLink } = this.state;
        const { username, name, followers, followings } = user;
        return (!isLoggedIn) ? <Redirect to="/login" /> : (
            <section className="user-profile-section">
                <header className="user-profile-section-header">
                        <h2>{ username }</h2>
                        <h4> { name }</h4>
                        <Link className="user-profile-edit-btn" to="/editprofile">
                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m256 151c-16.539062 0-30 13.460938-30 30s13.460938 30 30 30 30-13.460938 30-30-13.460938-30-30-30zm0 0"/><path d="m256 271c-33.089844 0-60 26.910156-60 60h120c0-33.089844-26.910156-60-60-60zm0 0"/><path d="m431.691406 171.480469 33.472656-66.929688-57.714843-57.714843-66.929688 33.472656c-6.5625-3.179688-13.269531-5.964844-20.050781-8.335938l-23.65625-71.972656h-81.621094l-23.660156 71.972656c-6.78125 2.371094-13.488281 5.15625-20.050781 8.335938l-66.929688-33.472656-57.714843 57.714843 33.472656 66.929688c-3.179688 6.5625-5.964844 13.269531-8.335938 20.050781l-71.972656 23.65625v81.621094l71.972656 23.660156c2.371094 6.78125 5.15625 13.488281 8.335938 20.050781l-33.472656 66.929688 57.714843 57.714843 66.929688-33.472656c6.5625 3.179688 13.269531 5.964844 20.050781 8.335938l23.65625 71.972656h81.621094l23.660156-71.972656c6.78125-2.371094 13.488281-5.15625 20.050781-8.335938l66.929688 33.472656 57.714843-57.714843-33.472656-66.929688c3.179688-6.5625 5.964844-13.269531 8.335938-20.050781l71.972656-23.65625v-81.621094l-71.972656-23.660156c-2.371094-6.78125-5.15625-13.492188-8.335938-20.050781zm-85.691406 189.519531h-180v-30c0-49.628906 40.371094-90 90-90-33.089844 0-60-26.910156-60-60s26.910156-60 60-60 60 26.910156 60 60-26.910156 60-60 60c49.628906 0 90 40.371094 90 90zm0 0"/></svg>
                        </Link>
                </header>
                <main>
                    <section className="user-profile-section-stats">
                        <a href = "#user-comments" className={activeLink === "comments" ? "active" : ""} id="comments" onClick={this.tabUpdate}>
                            <span id="comments" onClick={this.tabUpdate}> { myComments.length }</span>
                           { myComments.length === 1 ? "Comment" : "Comments"}
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
                            <span id="roomsCreated" onClick={this.tabUpdate}> { myRoomsCreated.length }</span>
                            Rooms Created
                        </a>
                        <a href="/accolades" className={activeLink === "accoladesGiven"  ? "active" : ""} id="accoladesGiven" onClick={this.tabUpdate}>
                            <span id="accoladesGiven" onClick={this.tabUpdate}> { commentsIGaveAccolade.length }</span>
                            Accolades Given
                        </a>
                    </section>

                    <section className = "user-profile-section-tabs">
                        { activeLink === "comments" && (
                            <React.Fragment>
                            <h3>Your Comments</h3>
                            {myComments.map(comment => <Comment {...comment} key={comment._id} />)} 
                            </React.Fragment>
                            )}

                        { activeLink === "followers" && (
                            <React.Fragment>
                            <h3>Your Followers</h3>
                            {followers.map(username=> <UserItem username={username} key={username} />)} 
                            </React.Fragment>
                            )}
                        { activeLink === "followings" && (
                            <React.Fragment>
                            <h3>Your Followings</h3>
                            {followings.map(username=> <UserItem username={username} key={username} />)} 
                            </React.Fragment>
                            )}

                        { activeLink === "roomsCreated" && (
                            <React.Fragment>
                            <h3>Rooms You've Created</h3>
                            {myRoomsCreated.map(room => <RoomItemWithHouse {...room} key={room._id} />)} 
                            </React.Fragment>
                            )}

                        { activeLink === "accoladesGiven" && (
                            <React.Fragment>
                            <h3>Comments You've Given Accolades To</h3>
                            {commentsIGaveAccolade.map(comment => <Comment {...comment} key={comment._id} />)} 
                            </React.Fragment>
                            )}
                    </section>
                </main>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const userId = state.user.user._id;

    return{
        isLoggedIn : state.user.isLoggedIn,
        user: state.user.user,
        myComments: state.comment.comments.filter(comment => comment.authorId === userId).sort((a,b) => new Date(b.timeCreated) - new Date(a.timeCreated)),
        myRoomsCreated: state.room.myRoomsCreated,
        commentsIGaveAccolade: state.comment.commentsIGaveAccolade.sort((a,b) => new Date(b.timeCreated) - new Date(a.timeCreated))
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUser: () =>  dispatch(updateUserAction()),
        getUserComments: () => dispatch(getUserCommentsAction()),
        getUserRooms: () => dispatch(getUserRoomsAction()),
        getCommentsUserGaveAccolade: () => dispatch(getCommentsUserGaveAccoladeAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);