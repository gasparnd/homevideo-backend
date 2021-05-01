const express = require('express')

const app = express()

const { config } = require('./config/index.js')

const moviesApi = require('./routes/movies')

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

// body parser 
app.use(express.json()) 

// routes
moviesApi(app)

// catch 404 error
app.use(notFoundHandler)

// Errors middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
	console.log(`Listening http:localhost:${config.port}`)
})