const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const cookieParser = require('cookie-parser')
const axios = require('axios')

const { config } = require('./config/index')

const app = express()

// time in seconds
const THIRTY_DAYS_IN_SEC = 2592000;
const TWO_HOURS_IN_SEC = 7200;

// body parser
app.use(express.json())
app.use(cookieParser())

// Basic Strategy
require('./utils/auth/strategies/basic')

// OAuth Strategy
require('./utils/auth/strategies/oauth')

app.post('/auth/sign-in', async (req, res, next) => {
	const { rememberMe } = req.body;

	passport.authenticate('basic', (error, data) => {
		try {
			if(error || !data) {
				next(boom.unauthorized())
			}

			req.login(data, { session: false }, async error => {
				if(error) {
					next(error)
				}

				const { token, ...user } = data

				res.cookie("token", token, {
					httpOnly: !config.dev,
					secure: !config.dev,
					maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
				})

				res.status(200).json(user)
			})
		} catch(err) {
			next(err)
		}
	})(req, res, next)
})

app.post('/auth/sign-up', async (req, res, next) => {
	const { body: user } = req

	try {
		await axios({
			url: `${config.apiUrl}/api/auth/sign-up`,
			method: 'post',
			data: user
		})

		res.status(201).json({
			message: 'user created'
		})
	} catch(err) {
		next(err)
	}
})

app.get('/movies', async (req, res, next) => {

})

app.post('/user-movies', async (req, res, next) => {
	try {
		const { body: userMovie } = req
    	const { token } = req.cookies

		const { data, status } = await axios({
			url: `${config.apiUrl}/api/user-movies`,
			headers: { Authorization: `Bearer ${token}` },
			method: 'post',
     	 	data: userMovie
		})

		console.log(data, status)

		if(status !== 201) {
			return next(boom.badImplementation())
		}

		res.status(201).json(data)
	} catch(err) {
		next(err)
	}
})

app.delete('/user-movies/:userMovieId', async (req, res, next) => {
	try {
		
		const { userMovieId } = req.params
		const { token } = req.cookies

		const { data, status } = await axios({
			url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
			headers: { Authorization: `Bearer ${token}` },
			method: 'delete'
		})

		if(status !== 200) {
			return next(boom.badImplementation())
		}

		res.status(200).json(data)
	} catch(err) {
		next(err)
	}
})

app.get('/auth/google-oauth', passport.authenticate('google-oauth', {
	scope: ['email', 'profile', 'openid']
}))

app.get('/auth/google-oauth/callback', 
	passport.authenticate('google-oauth', { session: false }),
	(req, res, next) => {
		if(!req.user) {
			next(boom.unauthorized())
		}

		const { token, ...user } = req.user

		res.cookie('token', token, {
			httpOnly: !config.dev,
			secure: !config.dev
		})

		res.status(200).json(user)
	}
)

app.listen(config.port, () => {
	console.log(`Listening in http://localhost:${config.port}`)
})