const express = require('express')

const app = express()

const { config } = require('./config/index.js')

const moviesApi = require('./routes/movies')

moviesApi(app)

app.listen(config.port, () => {
	console.log(`Listening http:localhost:${config.port}`)
})