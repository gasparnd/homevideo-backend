const express = require('express')

const UserMoviesService = require('../services/userMovies')
const validationHandler = require('../utils/middleware/validationHandler')

const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMovieSchema } = require('../utils/schemas/userMovies')

const userMoviesApi = app => {
	const router = express.Router()
	app.use('/api/user-movies', router) 

	const userMoviesService = new UserMoviesService()

	router.get('/', validationHandler({ userId: userIdSchema}, 'query'),
		async (req, res, next) => {
			const { userId } = req.query

			try {
				const userMovies = await userMoviesService.getUserMoivies({ userId })

				res.status(200).json({
					data: userMovies,
					message: 'user movies listed'
				})
			} catch(err) {
				next(err)
		}
	}) 

	router.post('/', validationHandler(createUserMovieSchema), async(req, res, next) => {
		const { body: userMovie } = req
		try {
			const createUserMovieId = await userMoviesService.createUserMovie({
				userMovie
			})

			res.status(200).json({
				data: createUserMovieId,
				message: 'user movie created'
			})
		} catch(err) {
			next(err)
		}
	})

	router.delete('/:userMovieId', 
		validationHandler({ userMovieId: movieIdSchema }, 'params'),
		async (req, res, next) => {
			const { userMovieId } = requ.params

			try {
				const deleteUserMovieId = await userMoviesService.delete({ 
					userMovieId 
				})

				res.status(200).json({
					data: deleteUserMovieId,
					message: 'user movie deleted'
				})
			} catch(err) {
				next(err)
			}
		})
}

module.exports = userMoviesApi