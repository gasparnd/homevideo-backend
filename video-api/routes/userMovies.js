const express = require('express')
const passport = require('passport')
const joi = require('@hapi/joi')
const UserMoviesService = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMovieSchema } = require('../utils/schemas/userMovies')

// JWT Strategy
require('../utils/auth/strategies/jwt')

const userMoviesApi = app => {
	const router = express.Router()
	app.use('/api/user-movies', router) 

	const userMoviesService = new UserMoviesService()

	router.get('/', 
		passport.authenticate('jwt', { session: false }), 
		scopesValidationHandler(['read:user-movies']),
		/*validationHandler(joi.object({ userId: userIdSchema }), 'query'),*/
		async (req, res, next) => {
			const { userId } = req.query

			try {
				const userMovies = await userMoviesService.getUserMovies({ userId })

				res.status(200).json({
					data: userMovies,
					message: 'user movies listed'
				})
			} catch(err) {
				next(err)
			}
		}
	) 

	router.post('/', 
		passport.authenticate('jwt', { session: false }), 
		scopesValidationHandler(['create:user-movies']),
		/*validationHandler(joi.object(createUserMovieSchema)),*/
		async(req, res, next) => {
			const { body: userMovie } = req
			try {
				const createUserMovieId = await userMoviesService.createUserMovie({
					userMovie
				})

				res.status(201).json({
					data: createUserMovieId,
					message: 'user movie created'
				})
			} catch(err) {
				next(err)
			}
		}
	)

	router.delete('/:userMovieId', 
		passport.authenticate('jwt', { session: false }),
		scopesValidationHandler(['delete:user-movies']),
		/*validationHandler(joi.object({ userMovieId: movieIdSchema }), 'params'),*/
		async (req, res, next) => {
			const { userMovieId } = req.params

			try {
				const deleteUserMovieId = await userMoviesService.deleteUserMovie({ 
					userMovieId 
				})

				res.status(200).json({
					data: deleteUserMovieId,
					message: 'user movie deleted'
				})
			} catch(err) {
				next(err)
			}
		}
	)
}

module.exports = userMoviesApi