const joi = require('@hapi/joi')

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const movieTitleSchema = joi.string().max(80)
const movieYeatSchema = joi
	.number()
	.min(1888)
	.max(2077)
const movieCoverSchema = joi.string().uri()
const movieDescriptioSchema = joi.string().max(300)
const movieDurationSchema = joi
	.number()
	.min(1)
	.max(3000)
const moviecontentRatingSchema = joi.string().max(5)
const movieSourceSchema = joi.string().uri()
const movieTagsSchema = joi.array().items(joi.string().max(50))

const createMovieSchema = {
	title: movieTitleSchema.required(),
	year: movieYeatSchema.required(),
	cover: movieCoverSchema.required(),
	description: movieDescriptioSchema.required(),
	duration: movieDurationSchema.required(),
	contentRating: moviecontentRatingSchema.required(),
	source: movieSourceSchema.required(),
	tags: movieTagsSchema
}

const updateMovieSchema = {
	title: movieTitleSchema,
	year: movieYeatSchema,
	cover: movieCoverSchema,
	description: movieDescriptioSchema,
	duration: movieDurationSchema,
	contentRating: moviecontentRatingSchema,
	source: movieSourceSchema,
	tags: movieTagsSchema
}

module.exports = {
	movieIdSchema,
	createMovieSchema,
	updateMovieSchema
}