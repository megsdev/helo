import React, { Component } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

class Form extends Component {
    constructor() {
        super()

        this.state = {
          title: '',
          img: 'https://www.fillmurray.com/640/360',
          content: ''  
        }
    }

    handleTitleInput = text => {
        this.setState({title: text})
    }

    handleImgInput = text => {
        this.setState({img: text})
    }

    handleContentInput = text => {
        this.setState({content: text})
    }

    createPost = () => {
        axios({
            method: 'POST',
            url: BASE_URL + '/api/post',
            data: this.state
        }).then(() => {
            this.props.history.push('/dashboard')
        })
    }

    render() {        
        return(
            <div className='Dash'>
                <div className='form posts-container'>
                    <h1 className='form-title'>New Post</h1>
                    <label className='form-text' htmlFor="title">Title: </label>
                    <input 
                        className='form-input-box' 
                        onChange={e => this.handleTitleInput(e.target.value)}
                        type="text"
                    />
                    <img className='murray' src={this.state.img} alt=""/>
                    <label className='form-text' htmlFor="image url">Image URL: </label>
                    <input 
                        className='form-input-box' 
                        onChange={e => this.handleImgInput(e.target.value)}
                        type="text"
                    />
                    <label className='form-text' htmlFor="content">Content: </label>
                    <input 
                        className='form-input-box' 
                        onChange={e => this.handleContentInput(e.target.value)}
                        type="text"
                    />

                    <div>
                        <button 
                            className='black-button'
                            onClick={this.createPost}
                        >Post</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form