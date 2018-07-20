require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const controller = require('./controller')
const cors = require('cors')


const app = express()
app.use(bodyParser())

app.use(cors())

//massive
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
})

app.post('/api/auth/register', controller.register)
app.post('/api/auth/login', controller.login)


app.listen(4000, () => {
    console.log('listening on port 4000')
})