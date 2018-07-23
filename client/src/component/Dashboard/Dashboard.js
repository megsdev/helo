import React, { Component } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:4000'


class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    componentDidMount = () => {
        this.getPosts()
    }

    //get all posts from db
    getPosts = () => {
        let url = BASE_URL + '/api/posts'
        if ( this.state.search && this.state.userposts) {
            url += '?search=' + this.state.search + '&userposts=' + this.state.userposts
        }
        else if ( this.state.userposts ) {
            url += '?userposts=' + this.state.userposts
        }

        else if ( this.state.search ) {
            url += '?search=' + this.state.search
        }
        axios({
            method: 'GET',
            url: url
        }).then(response => {
            this.setState({
                posts: response.data,
            })
        })
    }

    //reset search
    resetSearch = () => {
        let url = BASE_URL + '/api/posts/'
        if ( this.state.userposts ) {
            url += this.state.userposts
        }
        axios({
            method: 'GET',
            url: url
        }).then(response => {
            this.setState({
                posts: response.data,
                search: ''
            })
        })
    }

    handleSearchInput = text => {
        this.setState({
            search: text
        })
    }

    render() {
        console.log('state on dash', this.state)
        return(
            <div className='Dash'>
                <div className='dash-search-container content-box'>
                    <input 
                        type="text" 
                        className="search-box"
                        placeholder="Search by Title" 
                        onChange={(e) => this.handleSearchInput(e.target.value)}
                    />
                    <img className="dash_search_button" 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC"
                        alt="search"
                        onClick={this.getPosts} />                    
                    <button 
                        className='black-button'
                        onClick={this.resetSearch}
                    >
                        Reset
                    </button>
                    <label>My Posts</label>
                    <input type="checkbox"/>
                </div>

                <div className='posts-container content-box '>
                    {this.state.posts.map( post => {
                    return (
                    <div key={post.id}
                        className='content-box post-box'>
                        <h1>{post.title}</h1>
                        <h3>{post.username}</h3>
                        <img src="https://robohash.org/YOUR-TEXT.png?size=75x75" alt=""/>
                    </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default Dashboard