import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Comment from '../RoomComponents/Comment';
import { getUserCommentsAction , getCommentsUserGaveAccoladeAction } from '../../actions/commentActions'
import { updateUserAction } from '../../actions/userActions'
import { getUserRoomsAction } from '../../actions/roomActions'
import UserItem from './UserItem';
import RoomItemWithHouse from '../RoomComponents/RoomItemWithHouse';

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
        this.setState({
            activeLink : e.target.id
        })
    }

    render(){
        document.title = "Your Profile | Yarns";
        const { user, myComments, isLoggedIn , myRoomsCreated, commentsIGaveAccolade} = this.props;
        const { activeLink } = this.state;
        const { username, name, accolades, followers, followings, roomsCreated } = user;
        return (!isLoggedIn) ? <Redirect to="/login" /> : (
            <section className="user-profile-section">
                <header className="user-profile-section-header">
                        <h2>{ username }</h2>
                        <h4> { name }</h4>
                        <Link className="user-profile-edit-btn" to="/editprofile">
                            <svg viewBox="0 0 512 512"><g><g>
                                <g>
                                    <path d="M486.4,25.6h-76.8V0H102.4v25.6H25.6C10.24,25.6,0,35.84,0,51.2v61.44c0,58.88,43.52,107.52,102.4,115.2v2.56    c0,74.24,51.2,135.68,120.32,151.04L204.8,435.2h-58.88c-10.24,0-20.48,7.68-23.04,17.92L102.4,512h307.2l-20.48-58.88    c-2.56-10.24-12.8-17.92-23.04-17.92H307.2l-17.92-53.76c69.12-15.36,120.32-76.8,120.32-151.04v-2.56    c58.88-7.68,102.4-56.32,102.4-115.2V51.2C512,35.84,501.76,25.6,486.4,25.6z M102.4,176.64c-28.16-7.68-51.2-33.28-51.2-64V76.8    h51.2V176.64z M307.2,256L256,227.84L204.8,256l12.8-51.2l-38.4-51.2h53.76L256,102.4l23.04,51.2h53.76l-38.4,51.2L307.2,256z     M460.8,112.64c0,30.72-23.04,58.88-51.2,64V76.8h51.2V112.64z" data-original="#000000"/>
                                </g>
                            </g></g> 
                            </svg>
                        </Link>
                </header>
                <main>
                    <section className="user-profile-section-stats">
                        <a href = "#user-comments" className={activeLink === "comments" ? "active" : ""} id="comments" onClick={this.tabUpdate}>
                            <span> { myComments.length }</span>
                           { myComments.length === 1 ? "Comment" : "Comments"}
                        </a>
                        <a href="/followers" className={activeLink === "followers" ? "active" : ""} id="followers" onClick={this.tabUpdate}>
                            <span> { followers.length }</span>
                            Followers
                        </a>
                        <a href="/followings" className={activeLink === "followings" ? "active" : ""} id="followings" onClick={this.tabUpdate}>
                            <span> { followings.length }</span>
                            Followings
                        </a>
                        <a href="/roomscreated" className={activeLink === "roomsCreated" ? "active" : ""} id="roomsCreated" onClick={this.tabUpdate}>
                            <span> { roomsCreated }</span>
                            Rooms Created
                        </a>
                        <a href="/accolades" className={activeLink === "accoladesGiven"  ? "active" : ""} id="accoladesGiven" onClick={this.tabUpdate}>
                            <span> { accolades.length }</span>
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
        commentsIGaveAccolade: state.comment.commentsIGaveAccolade
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