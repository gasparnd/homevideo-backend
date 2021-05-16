const express = require('express')
const passport = require('passport')
const MoviesService = require('../services/movies')
const joi = require('@hapi/joi')

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')

const cacheResponse = require('../utils/cacheResponse')
const { 
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

// JWT Strategy
require('../utils/auth/strategies/jwt')

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', 
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['read:movies']),
        async (req, res, next) => {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
            const { tags } = req.query;
            try {
                const movies = await moviesService.getMovies({ tags });
                res.status(200).json({
                    data: movies,
                    message: "movies listed"
                })
            }
            catch (e) {
                next(e)
            }
        }
    )

    router.get('/:movieId', 
        passport.authenticate('jwt', { session: false }),
        validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
        scopesValidationHandler(['read:movies']), 
        async (req, res, next) => {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            const { movieId } = req.body;
            try {
                const movies = await moviesService.getMovie({ movieId })
                res.status(200).json({
                    data: movies,
                    message: "movie find"
                })
            }
            catch (e) {
                next(e)
            }
        }
    )

    router.post('/', 
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:movies']),
        validationHandler(joi.object(createMovieSchema)),
        async (req, res, next) => {
            const { body: movie } = req;
            try {
                const createdMovie = await moviesService.createMovie({ movie });
                res.status(201).json({
                    data: createdMovie,
                    message: "movie  created"
                })
            }
            catch (e) {
                next(e)
            }
        }
    )

    router.put('/:movieId', 
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['update:movies']),
        validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
        validationHandler(joi.object(updateMovieSchema)),
        async (req, res, next) => {
            const { movieId } = req.params;
            const { body: movie } = req;
            try {
                const updatedMovie = await moviesService.updateMovie({ movieId, movie })
                res.status(200).json({
                    data: updatedMovie,
                    message: "movie updated"
                })
            }
            catch (e) {
                next(e)
            }
        }
    )

    router.delete('/:movieId', 
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['delete:movies']),
        validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
        async (req, res, next) => {
            const { movieId } = req.params;
            try {
                const deleteMovie = await moviesService.deleteMovie({ movieId })
                res.status(200).json({
                    data: deleteMovie,
                    message: "movie deleted"
                })
            }
            catch (e) {
                next(e)
            }
        }
    )
}



module.exports = moviesApi