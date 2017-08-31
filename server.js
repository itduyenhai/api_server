import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import http from 'http'
import mongoose from 'mongoose'
import config from './api/v1/config'

// Var route
import v1 from './api/v1'

// Port
var port = process.env.PORT || '3000'

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Connect database
// mongoose.connect(config.DATABASE)
mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE, { useMongoClient: true })
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((error) => {
        console.log('error connecting to db:')
    });

// Use route
app.use('/api/v1', v1)

// Create server
var server = http.createServer(app)

server.listen(port)
server.on('error', () => {
    console.log('Server error!')
})

server.on('listening', () => {
    console.log('Server running on: ' + port)
})