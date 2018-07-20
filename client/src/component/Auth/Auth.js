import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { updateUserInfo } from '../../ducks/reducer'

const BASE_URL = 'http://localhost:4000'


class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameInput = text => {
        this.setState({
            username: text
        })
    }

    handlePasswordInput = text => {
        this.setState({ 
            password: text
        })
    }

    createUser = () => {
        axios({
            method: 'POST',
            url: BASE_URL + '/api/auth/register',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then((res) =>  {
            console.log('res.data', res.data)
            this.props.updateUserInfo(res.data[0].id, res.data[0].username, res.data[0].profile_pic)
            this.props.history.push('/dashboard')
        })
    }
    //function is throwing an error, need to fix

    loginUser = () => {
        axios({
            method: 'POST',
            url: BASE_URL + '/api/auth/login',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then((res) =>  {
            if(res.data === 'not found') {
                this.props.history.push('/')
            } else {
                this.props.updateUserInfo(res.data[0].id, res.data[0].username, res.data[0].profile_pic)
                this.props.history.push('/dashboard')
            }
        })
    }

    render() {
        console.log('this is this.props', this.props)
        return(
            
            <div>
                <h1>Auth</h1>
                <h2>Username: </h2>
                <input type="text" onChange={ e => this.handleUsernameInput(e.target.value)} />
                <h2>Password: </h2>
                <input type="text" onChange={ e => this.handlePasswordInput(e.target.value)} />
                <br />
                    <button onClick={this.loginUser} >Login</button>
                    <button onClick={this.createUser}>Register</button>
                
            </div>
        )
    }
}

export default connect(null, { updateUserInfo })(Auth)