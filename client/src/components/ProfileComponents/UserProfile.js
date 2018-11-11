import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Comment from '../RoomComponents/Comment';
import { getMyCommentsAction } from '../../actions/commentActions'
import { updateUserAction } from '../../actions/userActions'

class UserProfile extends Component {

    componentDidMount(){
        this.props.updateUser();
        this.props.getMyComments();
    }

    render(){
        document.title = "Your Profile | Yarns";
        const { user, myComments, isLoggedIn } = this.props;
        console.log(myComments);
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
                        <Link to="/followers" >
                            <span> { followers.length }</span>
                            Followers
                        </Link>
                        <Link to="/followings" >
                            <span> { followings.length }</span>
                            Followings
                        </Link>
                        <Link to="/roomscreated" >
                            <span> { roomsCreated }</span>
                            Rooms Created
                        </Link>
                        <a href = "#user-comments" >
                            <span> { myComments.length }</span>
                           { myComments.length === 1 ? "Comment" : "Comments"}
                        </a>
                        <Link to="/accolades" >
                            <span> { accolades.length }</span>
                            Accolades Given
                        </Link>
                    </section>

                    <section className = "user-profile-section-comments" id="user-comments">
                        { myComments.map(comment => <Comment {...comment} key={comment._id} />) }
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
        myComments: state.comment.comments.filter(comment => comment.authorId === userId).sort((a,b) => new Date(b.timeCreated) - new Date(a.timeCreated))
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUser: () =>  dispatch(updateUserAction()),
        getMyComments: () => dispatch(getMyCommentsAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);