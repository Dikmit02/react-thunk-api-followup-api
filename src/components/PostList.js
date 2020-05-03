import React from 'react'

import { connect } from 'react-redux'
import { fetchPostAndUsers } from '../actions'

import UserHeader from './UserHeader'

class PostList extends React.Component {
    componentDidMount() {
        //action creator is calling so as to get the data
        //fetchPosts is an action creator
        this.props.fetchPostAndUsers()
    }
    renderList() {
        return this.props.posts.map(post => {
            return (
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <div>
                            <UserHeader userId={post.userId}/>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {

        console.log(this.props.posts)
        //[] //beacuse reducers first tym runs with an empty object
        // response object // second tym runs when
        //fetchPosts is called
        return (
            <div className="ui relaxed divided list">{this.renderList()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts }
}
//sending null whwn we have no maptoprop function

// export default connect(null,{fetchPosts})(PostList)

export default connect(mapStateToProps, { fetchPostAndUsers })(PostList)
