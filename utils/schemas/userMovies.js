const joi = require('@hapi/joi')

const { movieIdSchema } = require('./movies')
const { userIdSchema } = require('./user')

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserMovieSchema = {
	userId: userIdSchema,
	movieId: movieIdSchema
}

module.exports = {
	userMovieIdSchema,
	createUserMovieSchema
}