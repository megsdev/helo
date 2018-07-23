import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { updateUserInfo } from '../../ducks/reducer'

class Nav extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        if(this.props.location.pathname !== '/') {
            return(
                <div className='Nav'>
                    <h1>Nav</h1>
                    <img src="https://robohash.org/YOUR-TEXT.png?size=100x100" alt=''/>
                    {this.props.username}
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

    }

function mapStateToProps(state) {
    const { username, profilePic, updateUserInfo } = state

    return { username, profilePic, updateUserInfo}
}


export default connect(mapStateToProps) (withRouter(Nav))