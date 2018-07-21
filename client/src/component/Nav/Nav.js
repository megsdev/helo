import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Nav(props) {
    console.log('props on nav', props)
    if(props.location.pathname !== '/') {
        return(
            <div className='Nav'>
                <h1>Nav</h1>
                <img src="https://robohash.org/YOUR-TEXT.png?size=100x100" alt=''/>
                {props.username}
                <Link to='/dashboard' >
                    <button>Home</button>
                </Link>
                <Link to='/new' >
                    <button>New Post</button>
                </Link>
                <Link to='/' >
                    <button>Logout</button>
                </Link>

            </div>
        )
    } 
    return null
}

function mapStateToProps(state) {
    const { username, profilePic } = state

    return { username, profilePic}
}


export default connect(mapStateToProps) (withRouter(Nav))