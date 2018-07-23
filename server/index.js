require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const controller = require('./controller')
const cors = require('cors')
const session = require('express-session')


const app = express()
app.use(bodyParser())
app.use(cors())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

//massive
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
})

app.post('/api/auth/register', controller.register)
app.post('/api/auth/login', controller.login)
app.post('/api/auth/logout', controller.logout)
app.get('/api/posts', controller.getPosts)
app.post('/api/post', controller.createPost)
app.get('/api/auth/me', controller.me)


app.listen(4000, () => {
    console.log('listening on port 4000')
})