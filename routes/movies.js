const express = require('express')
const { moviesMock } = require('../utils/mocks/movies')

function moviesApi(app) {
	const router = express.Router()
	app.use('/api/movies', router)
	router.get('/', async(req, res, next) => {
		try {
			const movies = await Promise.resolve(moviesMock)

			res.status(200).json({
				data: movies,
				message: 'movies listed'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.get('/:movieId', async(req, res, next) => {
		try {
			const movie = await Promise.resolve(moviesMock[0])

			res.status(200).json({
				data: movie,
				message: 'movie read'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.post('/', async(req, res, next) => {
		try {
			const createMoviesId = await Promise.resolve(moviesMock[0].id)

			res.status(201).json({
				data: createMoviesId,
				message: 'movie create'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.put('/:movieId', async(req, res, next) => {
		try {
			const updatedMovieId = await Promise.resolve(moviesMock[0].id)

			res.status(200).json({
				data: updatedMovieId,
				message: 'movie update'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.delete('/:movieId', async(req, res, next) => {
		try {
			const deleteMovieId = await Promise.resolve(moviesMock[0].id)

			res.status(200).json({
				data: deleteMovieId,
				message: 'movie deleted'
			})
		} catch(err) {
			next(err.message)
		}
	})
}

module.exports = moviesApi