const express = require('express')
const MoviesService = require('../services/movies')
const joi = require('@hapi/joi')

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

const cacheResponse = require('../utils/cacheResponse')
const { 
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', async (req, res, next) => {
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
    });

    router.get('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), async (req, res, next) => {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
        const { movieId } = req.params;
        try {
            const movies = await moviesService.getMovie({ movieId })
            res.status(200).json({
                data: movies,
                message: "movies find"
            })
        }
        catch (e) {
            next(e)
        }
    });

    router.post('/', validationHandler(joi.object(updateMovieSchema)), async (req, res, next) => {
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
    });

    router.put('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), validationHandler(joi.object(updateMovieSchema)), async (req, res, next) => {
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
    });

    router.delete('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), async (req, res, next) => {
        const { movieId } = req.params;
        try {
            console.log(movieId);
            const deleteMovie = await moviesService.deleteMovie({ movieId })
            res.status(200).json({
                data: deleteMovie,
                message: "movie deleted"
            })
        }
        catch (e) {
            next(e)
        }
    });
}



module.exports = moviesApi